# Plot Like Matlab!
Library to create beautiful responsive math graphs and animations for web pages using SVG images.
This graph library have been developed using Snap.svg as main engine. So, don't forget to add this dependency to your project when using plotlikematlab functions!

See how to use this graph library. First you must include the snap.svg-min.js file. After, the plotlikematlab.js file

```javascript
<script type="text/javascript" src="snap.svg-min.js"></script>
<script type="text/javascript" src="plotlikematlab.js"></script>
```

That's it! Now you can start creating plots like when you are using Matlab! See an example below

```javascript
     <svg id="figure1"></svg>
    <script>
    var figure1 = new Figure('#figure1',1000,500);
    var tdata=[],ydata=[];
    for (var i=0;i<100;i++){
    ydata[i]=Math.sin(i*0.1);
    tdata[i]=i*0.1;
    }
    figure1.plot(tdata,ydata,{color:"red",linewidth:2});
    for (var i=0;i<100;i++){
    ydata[i]=Math.cos(i*0.1);
    tdata[i]=i*0.1;
    }
    figure1.plot(tdata,ydata,{color:'newblue',linewidth:2});
    figure1.title('Sine Function');
    figure1.ylabel('Velocity (m/s)');
    figure1.xlabel('Time (s)');
    </script>
```
