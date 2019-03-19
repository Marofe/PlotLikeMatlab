/*! Plot Like Matlab v0.1 | (c) Eng. Marcos Rogério Fernandes | github.com/marofe */

function Figure(container,width,height) {
    var that = this;
    this.width=width;
    this.height=height;
    this.FigAxis={xmin:50,xmax:this.width-50,ymin:50,ymax:this.height-50},
    this.hspace=this.FigAxis.xmax-this.FigAxis.xmin;
    this.vspace=this.FigAxis.ymax-this.FigAxis.ymin;
    this.snap = Snap(container).attr({
        version:"1.1",
        x:"0px", 
        y:"0px",
        width:"100%",
        viewBox:"0 0 "+width+" "+height,
    });
    this.snap.rect(0,0,this.width,this.height).attr({fill:'#eee'});
    this.snap.rect(this.FigAxis.xmin,this.FigAxis.ymin,this.hspace,this.vspace).attr({
      fill:'#fff',stroke:'black', strokeWidth:0.5
    });
    this.gridSizeX = 50;
    this.gridSizeY = 50;
    this.grid = function(){ //must be call after the plot
      that.gridSizeX = that.hspace/(that.xMax-that.xMin);
      var xValue = Vector(that.xMin,1,that.xMax);
      var yValue = Vector(that.yMin,0.1,that.yMax);
        for (var i=0; i<=(that.xMax-that.xMin); i++) {
          var x = i*that.gridSizeX+that.FigAxis.xmin;
          
          // Creates the vertical lines in the graph
          that.snap.line(x, that.FigAxis.ymax, x, that.FigAxis.ymin).attr({
            stroke: "#ccc",
            strokeWidth: 0.5
          });
          that.snap.line(x, that.FigAxis.ymin, x, that.FigAxis.ymin+10).attr({
            stroke: "#000",
            strokeWidth: 0.5
          });
          that.snap.line(x, that.FigAxis.ymax, x, that.FigAxis.ymax-10).attr({
            stroke: "#000",
            strokeWidth: 0.5
          });
          that.snap.text(x-5,that.height-30,xValue[i].toString()).attr({
            fontSize:12
          });
          that.gridSizeY = that.vspace/(that.xMax-that.xMin);
          var y = -i*that.gridSizeY+that.vspace+that.FigAxis.ymin;
          
          // Creates the horizontal lines in the graph
          that.snap.line(that.FigAxis.xmin, y, that.FigAxis.xmax, y).attr({
            stroke: "#ccc",
            strokeWidth: 0.5
          });
          that.snap.line(that.FigAxis.xmin, y, that.FigAxis.xmin+10,y).attr({
            stroke: "#000",
            strokeWidth: 0.5
          });
          that.snap.line(that.FigAxis.xmax, y, that.FigAxis.xmax-10,y).attr({
            stroke: "#000",
            strokeWidth: 0.5
          });
          that.snap.text(that.FigAxis.xmin-25,y+5,yValue[i].toFixed(1).toString()).attr({
            fontSize:12
          });
        }
    
      }
     this.convertToPath=function(x,y){
        var path = '';
        that.yMax = Math.max.apply(null,y);
        that.yMin = Math.min.apply(null,y);
        that.xMax = Math.max.apply(null,x);
        that.xMin = Math.min.apply(null,x);
        that.scaleY = that.vspace/(that.yMax-that.yMin);
        that.scaleX = that.hspace/(that.xMax-that.xMin);
        for (var i=0; i<x.length; i++){
         var yp = (that.yMin-y[i])*that.scaleY+that.FigAxis.ymin+that.vspace; // Convert points to how we like to view graphs
         var xp = x[i]*that.scaleX+that.FigAxis.xmin; // Convert points to how we like to view graphs
          if (i===0){
            path += 'M'+xp+','+yp+' R';
          }
          else if (i===x.length-1){ 
            path += xp+','+yp; //ending the path
          }
          else {
            path += xp+','+yp+','; //continuing the path
          }
        }
        return path;
      }
    this.length,
    this.plot=function (x,y,setup) {
      that.length=x.length; //catch the length of the input vector
        if (setup == null) {
            setup = {
            color: 'red',
            linewidth: 1,
            linestyle:'0 0'
            }
        }else {
         if (setup.color==null) setup.color='red'; 
         if (setup.linewidth==null) setup.linewidth=1;
         if (setup.color=='newblue') setup.color='rgb(0,114,189)';
         if (setup.color=='newred') setup.color='rgb(217,83,25)';
         if (setup.color=='newgreen') setup.color='rgb(119,172,48)';
        
         if (setup.linestyle=='--') {
           setup.linestyle='10 5'; //dashed line
        }else {
          setup.linestyle='0 0';  //continous line
         }
        }
        var pathString = that.convertToPath(x,y,that.height);
        that.snap.path(pathString).attr({
          fill:'transparent',
          stroke: setup.color,
          strokeWidth: setup.linewidth,
          strokeDasharray: setup.linestyle
        });
      }
    this.title=function(tlt,setup){
      if (setup == null){
        setup = {
          fontSize:30,
          fontFamily: 'verdana',
          fontWeight: 'bold',
          class:'title'
        }
      }
      that.snap.text(that.width/2-10*tlt.length,35,tlt).attr(setup);
    }
    this.ylabel=function(tlt,setup){
      if (setup == null){
        setup= {
          fontSize:20,
          fontFamily: 'verdana',
          transform: 'rotate(-90 30 '+that.height/2+')'
        }
      }
      that.snap.text(20-5*tlt.length,that.height/2-10,tlt).attr(setup);
    }
    this.xlabel=function(tlt,setup){
      if (setup == null){
        setup= {
          fontSize:20,
          fontFamily: 'verdana'
        }
      }
      that.snap.text(that.width/2-5*tlt.length,that.height-10,tlt).attr(setup);
    }
}

function Vector(start,dt,end) {
    var N = (end-start)/dt+1;
    var vect= new Array();
    vect[0]=start;
    for (var i=1;i<N;i++){
        vect[i]=i*dt;
    }
    return vect;
}

function sin(t) {
  var vect= new Array();
  for (var i=0;i<t.length;i++){
      vect[i]=Math.sin(t[i]);
  }
  return vect;
}
function cos(t) {
  var vect= new Array();
  for (var i=0;i<t.length;i++){
      vect[i]=Math.cos(t[i]);
  }
  return vect;
}

function multply(t,A) {
  var vect= new Array();
  for (var i=0;i<t.length;i++){
      vect[i]=A*t[i];
  }
  return vect;
}

function sum(t,A) {
  var vect= new Array();
  for (var i=0;i<t.length;i++){
      vect[i]=t[i]+A;
  }
  return vect;
}

function multplyPoint(t1,t2) {
  var vect= new Array();
  for (var i=0;i<t1.length;i++){
      vect[i]=t1[i]*t2[i];
  }
  return vect;
}




