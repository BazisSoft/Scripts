import * as net from 'net';
export namespace Common {
    export let DataType = {
        login: 'login',
        move: 'move'
    }
    export interface DefaultMsg {
        type: string;
    }

    export interface LoginMsg extends DefaultMsg {
        username: string;
    }
    export interface MoveMsg extends DefaultMsg {
        from,
        to
    }

    export function SendMessage(msg: string, client: net.Socket) {
        const data = 'content-length: ' + Buffer.byteLength(msg, 'utf8') + '\r\n' + msg;
        client.write(data, 'utf8');
    }
}