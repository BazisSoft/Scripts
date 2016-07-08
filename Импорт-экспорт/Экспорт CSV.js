var
  csvRows = [];

function Recurse(List)
{
  for (var i = 0; i < List.Count; i++) {
    Obj = List[i];
    if (Obj.List)
      Recurse(Obj)
    else {
      var Line = [];
      Line.push(Obj.Name);
      Line.push(Obj.ArtPos);
      Line.push(Obj.GSize.x);
      Line.push(Obj.GSize.y);
      Line.push(Obj.GSize.z);
      Butt = '��� ������';
      if (Obj.Butts && (Obj.Butts.Count))
        Butt = Obj.Butts.Count + ' ������';
      Line.push(Butt);
      csvRows.push(Line.join(';'));
    }
  }
}

Recurse(Model);
system.askWriteTextFile('csv', csvRows.join('\n'));
