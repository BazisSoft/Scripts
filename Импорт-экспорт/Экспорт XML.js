system.require('ObjTree.js');

Doc = {}
Doc.Element = [];

function Recurse(List)
{
  for (var i = 0; i < List.Count; i++) {
    Obj = List[i];
    if (Obj.List)
      Recurse(Obj)
    else {
      var Line = {};
      Line.Name = Obj.Name;
      Line.Width = Obj.GSize.x;
      Line.Height = Obj.GSize.x;
      Doc.Element.push(Line);
    }
  }
}

Recurse(Model);

xotree = new XML.ObjTree();
xml = xotree.writeXML(Doc);

system.askWriteTextFile('xml', xml);
