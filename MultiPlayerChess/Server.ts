import * as Net from 'net';
import { Common } from './CommonClasses';
const portNumber = 5800;

class ChessConnection {
    constructor(conn: Net.Socket, server: ChessServer) {
        this.connection = conn;
        conn.on('data', this.transformInData);
        this.server = server;
        this.list = server.connections;
    }
    busy(): boolean {
        return this.friend !== undefined;
    }

    connection: Net.Socket;
    friend: Net.Socket | undefined;
    userName: string;
    list: connectionList;
    server: ChessServer;

    transformState: string;
    dataBuff: Buffer = Buffer.allocUnsafe(0);
    inHeaders = {};

    push(data: string) {
        let dataObj = <Common.DefaultMsg>JSON.parse(data);
        let dataType = Common.DataType;
        switch (dataObj.type) {
            case dataType.login: {
                let loginMsg = <Common.LoginMsg>dataObj;
                let uName = loginMsg.username;
                if (this.list.ValidateUserName(uName)) {
                    this.userName = uName;
                    this.list.pushConnection(this);
                    console.log(`user ${uName} added`);
                    this.connection.on('close', () => {
                        console.log(`user ${this.userName} left`);
                    })
                }
                else {
                    Common.SendMessage(JSON.stringify(loginMsg), this.connection);
                }
            }
            case dataType.move: {
                //TODO:
            }
        }
    }

    transformInData(data: Buffer) {
        let inData = Buffer.concat([this.dataBuff, data]);
        while (true) {
            if (this.transformState === 'headers') {
                // Not enough data
                if (!inData.includes('\r\n'))
                    break;

                var bufString = inData.toString('utf8');
                if ((<any>bufString).startsWith('\r\n')) {
                    inData = inData.slice(2);
                    this.transformState = 'body';
                    continue;
                }

                // Match:
                //   Header-name: header-value\r\n
                var match = bufString.match(/^([^:\s\r\n]+)\s*:\s*([^\s\r\n]+)\r\n/);
                if (!match) {
                    return;
                }

                this.inHeaders[match[1].toLowerCase()] = match[2];

                inData = inData.slice(Buffer.byteLength(match[0], 'utf8'));
            } else {
                var len = this.inHeaders['content-length'];
                if (len === undefined) {
                    return;
                }

                len = len | 0;
                if (Buffer.byteLength(<any>inData, 'utf8') < len)
                    break;

                this.push(inData.slice(0, len).toString('utf8'));
                this.transformState = 'headers';
                this.dataBuff = inData.slice(len);
                this.inHeaders = {};
            }
        }
    }
}

class connectionList {
    list: Array<ChessConnection> = [];
    findConnection(name: string): ChessConnection | undefined {
        for (let i = 0; i < this.list.length; i++) {
            let conn = this.list[i];
            if (conn.userName === name) {
                return conn;
            }
        }
        return undefined
    }
    findSocketInfo(socket: Net.Socket): ChessConnection | undefined {
        for (let i = 0; i < this.list.length; i++) {
            let conn = this.list[i];
            if (conn.connection === socket) {
                return conn;
            }
        }
        return undefined
    }
    pushConnection(conn: ChessConnection) {

    }

    ValidateUserName(uName: string): boolean {
        let conn = this.findConnection(uName);
        return conn ? true : false;
    }
}

class ChessServer {
    constructor(port: number) {
        this.server = Net.createServer((conn: Net.Socket) => {
            console.log(`connection: ${conn.remotePort}`);
            new ChessConnection(conn, this);
        });
        this.server.listen(port);
        // let adress = this.server.address();
        console.log(`start listening`);// at ${adress.address}:${adress.port}`);
    }
    connections = new connectionList();
    server: Net.Server;
}

new ChessServer(portNumber);