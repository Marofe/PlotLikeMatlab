/*! Plot Like Matlab v0.1 | (c) Eng. Marcos Rogério Fernandes | github.com/marofe */

function Figure(container,width,height) {
    this.width=width;
    this.height=height;
    this.axis={xmin:50,xmax:this.width-50,ymin:50,ymax:this.height-50},
    this.hspace=this.axis.xmax-this.axis.xmin;
    this.vspace=this.axis.ymax-this.axis.ymin;
    this.snap = Snap(container).attr({
        version:"1.1",
        x:"0px", 
        y:"0px",
        width:"100%",
        viewBox:"0 0 "+width+" "+height,
    });
    this.snap.rect(0,0,this.width,this.height).attr({fill:'#eee'});
    this.snap.rect(this.axis.xmin,this.axis.ymin,this.hspace,this.vspace).attr({fill:'#fff'});
    this.gridSize = 50;
    var that = this;
    this.grid = function(){

        for (var i=0; i*that.gridSize<that.axis.ymax+that.gridSize; i++) {
          var x = i*that.gridSize+that.axis.xmin;
          // Creates the vertical lines in the graph
          that.snap.line(x, that.axis.ymax, x, that.axis.ymin).attr({
            stroke: "#ccc",
            strokeWidth: 0.5
          });
        }
        for (var i=0; i*that.gridSize<that.axis.xmax+that.gridSize; i++) {
            var y = -i*that.gridSize+that.axis.ymax-that.axis.ymin;
          // Creates the horizontal lines in the graph
          that.snap.line(that.axis.xmin, y, that.axis.xmax, y).attr({
            stroke: "#ccc",
            strokeWidth: 0.5
          });
        }
    
      }
     this.convertToPath=function(x,y){
        var path = '';
        var yMax = Math.max.apply(null,y);
        var yMin = Math.min.apply(null,y);
        var xMax = Math.max.apply(null,x);
        var xMin = Math.min.apply(null,x);
        var scaleY = that.vspace/(yMax-yMin);
        var scaleX = that.hspace/(xMax-xMin);
        for (var i=0; i<x.length; i++){
         var yp = (yMin-y[i])*scaleY+that.axis.ymin+that.vspace; // Convert points to how we like to view graphs
         var xp = x[i]*scaleX+that.axis.xmin; // Convert points to how we like to view graphs
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
    
    this.plot=function (x,y,setup) {
        if (setup == null) {
            setup = {
            color: 'red',
            linewidth: 1
            }
        }else {
         if (setup.color==null) setup.color='red'; 
         if (setup.linewidth==null) setup.linewidth=1;
        }
        var pathString = that.convertToPath(x,y,that.height);
        that.snap.path(pathString).attr({
          fill:'transparent',
          stroke: setup.color,
          strokeWidth: setup.linewidth
        });
      }
    this.title=function(tlt){
    }
}

function Vector(start,dt,end) {
    var N = (end-start)/dt+1;
    console.log(N);
    var vect= new Array();
    vect[0]=start;
    for (var i=1;i<N;i++){
        vect[i]=i*dt;
    }
    return vect;
}


