import{Component, NgZone}from'@angular/core';
import { NavController, MenuController, Events, NavParams}from 'ionic-angular';
import { CheckinPage}from '../checkin/checkin';
import { BluetoothPage }from '../bluetooth/bluetooth';
import { TimelinePage }from '../timeline/timeline';
import { AdventuresPage}from '../adventures/adventures';
import { PebblPage } from '../pebbl/pebbl';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
import * as firebase from 'firebase';

declare var d3: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CheckinService]
})
export class HomePage {

  navPages: Array<{title: string, icon: string, path: string, component: any}>;
  adventures: any;
  adventuresDetail: any;
  arrayLength: any;
  firstMem: any;
  userId: any;
  private hardwareMemories: any;;
  private numMems: any;
  constructor(private _zone: NgZone, public navCtrl: NavController, private checkinService: CheckinService,
    public menu: MenuController, public events: Events, private navParams: NavParams) {
      this.navPages = [
        { title: 'Timeline', icon: 'center', path: 'img/Timeline_outline.svg', component: TimelinePage },
        { title: 'Check In', icon: 'center', path: 'img/Checkin_outline.svg', component: CheckinPage },
        { title: 'Adventures', icon: 'center', path: 'img/Adventure_outline.svg', component: AdventuresPage }
      ];
      this.numMems = 0;
      this.hardwareMemories = firebase.database().ref('hardware-memories');

      if(navParams.get('fm')){
        this.firstMem = navParams.get('fm');
      }
    }

    pushPage(page) {
      this.navCtrl.push(page.component);
    }

    pushInstantMemory(){
      this.navCtrl.push(PebblPage);
    }

    createChart() {

      var width = 500,
      height = 500,
      start = 0,
      end = 0.75,
      numSpirals = 4,
      margin = {top:50,bottom:50,left:50,right:50};

    var theta = function(r) {
      return numSpirals * Math.PI * r;
   };
    // console.log("home.ts - enetered chart making");
    // var width = 500,
    //     height = 550,
    //     nodes = [], //Where all circles are stored
    //     maxSpeed = 1.5,
    //     padding = 1,
    //     m = 4,
    //     // Number of balls we want
    //     n = 40,
    //     activity = ['Taking a break', 'Taking a walk', 'Golden Poppies', 'Enjoying the sun', 'Team Meeting', 'Walking to School', 'Starting the day', 'Chilling', 'Pratik & Carlo', 'Carlo & Shirish', 'Getting Money', 'Party It Up', 'Hardware'],
    //     date = ['April 18th 2017', 'April 16th 2017', 'April 14th 2017', 'April 12th 2017', 'April 10th 2017', 'April 10th 2017', 'April 8th 2017', 'April 8th 2017'],
    //     location = ['campanille', 'campanille', 'Alameda Beach', 'UC Berkeley', 'School of Information', 'UC Berkeley', 'Daniel\'s House', 'campanille', 'Hawaii', 'Carina\'s House', 'The House', 'Robin\'s House', 'HPP'],
    //     photo = ['m1.JPG','m2.JPG','m3.JPG','m4.JPG','m5.JPG','m6.JPG','m7.JPG','m8.JPG', 'm9.jpg','m11.jpg', 'm12.jpg', 'm13.jpg', 'm14.jpg'],
    //     radius = d3.scale.sqrt().range([0, 8]),
    //     // Creating a rectangle to control the boundary of the ball
    //     rect = [50,50, width - 50, height - 50],
    //     // Where memory card is stored.
    //     card = d3.select("body").selectAll("div.card"),
    //     // Color Pallet
    //     color = d3.scale.ordinal().range([d3.rgb(255,186,73), d3.rgb(84,195,194), d3.rgb(75,181,217), d3.rgb(222,243,243)]).domain(d3.range(m));

    //     // Creating circles
    //     for (var i in d3.range(n)){
    //       var j = parseInt(i) % 13
    //       var k = parseInt(i) % 8
    //       nodes.push({radius: radius(1 + Math.floor(Math.random() * 4)),
    //       // x & y positions on canvas
    //       x: rect[0] + (Math.random() * (rect[2] - rect[0])),
    //       y: rect[1] + (Math.random() * (rect[3] - rect[1])),
    //       activity: activity[j],
    //       date: date[k],
    //       location: location[j],
    //       photo: photo[j],
    //       // Horizontal & Vertical Speed
    //       speedX: (Math.random() - 0.5) * 2 *maxSpeed,
    //       speedY: (Math.random() - 0.5) * 2 *maxSpeed});
    //     }
    // // Make the first
    // var root = nodes[0]
    // root.radius = 0;
    // root.fixed = true;

    // // Force Layout
    // var force = d3.layout.force()
    //     .gravity(0)
    //     // charge determines the force applied to the cluster
    //     .charge(function(d, i) { return i ? 0 : -300; })
    //     .nodes(nodes)
    //     .size([width, height])
    //     .on("tick", tick)
    //     .start();

    // var svgDiv = document.getElementById('mySvg');

    // // Creating the canvas
    // var svg = d3.select("#mySvg")

    // // Creating circles on canvas
    // var circle;
    // this._zone.run(() => {
    // circle = svg.selectAll("circle")
    //     .data(nodes.slice(1))
    //     .enter().append("circle")
    //     .attr("r", function(d) { return d.radius; })
    //     .attr("cx", function(d, i) { return d.x})
    //     .attr("cy", function(d, i) { return d.y})
    //     .attr("date", function(d, i) { return d.date})
    //     .attr("location", function(d, i) { return d.location})
    //     .attr("activity", function(d, i) { return d.activity})
    //     .attr("photo", function(d, i) { return d.photo})
    //     .style("fill", function(d, i) { return color(i); });
    //   });

    // //Firstly, it create a quadtree object, using the coordinate of the nodes.
    // //Then the quadtree call the visit() to check whether it have collision.
    // //We will check the collide method later, but from the code suggests,
    // //it change the (x,y) coordinate so we need to update the cx and cy attribute accordingly.
    // function tick(e) {

    // force.alpha(0.1)
    // circle
    //   // This sets the boundary for collision
    //   .each(gravity(e.alpha))
    //   .each(collide(.5))
    //   // Updating location and making sure it doesnt go outside of the boundary
    //   .attr("cx", function(d) { return d.x = Math.max(d.radius, Math.min(width - d.radius, d.x)); })
    //   .attr("cy", function(d) { return d.y = Math.max(d.radius, Math.min(height - d.radius, d.y)); })
    //   //allows dragging
    //   .call(force.drag()
    //     .on("drag", dragged));

 

    // used to assign nodes color by group
    var color = d3.scaleOrdinal(d3.schemeCategory10);


    // var bar_colors = {'4': 'green'};

    // console.log('Hey');
    // console.log(color);
    // console.log('Done');


    var r = d3.min([width, height]) / 2 - 40;

    var radius = d3.scaleLinear()
      .domain([start, end])
      .range([40, r]);

    var svg = d3.select("#vis").append("svg")
      .attr("width", width + margin.right + margin.left + 80)
      .attr("height", height + margin.left + margin.right)
      .style("margin-left", "0px")
      .append("g")
      .attr("transform", "translate(" + (width/2 - 40) + "," + height / 2 + ")");

      var points = d3.range(start, end + 0.001, (end - start) / 1000);

      var spiral = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle(theta)
      .radius(radius);

      var path = svg.append("path")
      .datum(points)
      .attr("id", "spiral")
      .attr("d", spiral)
      .style("fill", "none")
      .style("stroke", "steelblue");

    var spiralLength = path.node().getTotalLength(),
        N = 365,
        barWidth = (spiralLength / N) - 1;
    var someData = [];
    for (var i = 0; i < N; i++) {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i + 1);
      someData.push({
        date: currentDate,
        value: Math.random(),
        group: currentDate.getMonth()
      });
    }
    var timeScale = d3.scaleTime()

      .domain(d3.extent(someData, function(d){
        return d.date;
      }))
      .range([0, spiralLength]);

      // yScale for the bar height
      var yScale = d3.scaleLinear()
      .domain([0, d3.max(someData, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 30]);

      svg.selectAll("rect")
      .data(someData)
      .enter()
      .append("rect")
      .attr("x", function(d,i){

        var linePer = timeScale(d.date),
        posOnLine = path.node().getPointAtLength(linePer),
        angleOnLine = path.node().getPointAtLength(linePer - barWidth);

        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral

        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

        return d.x;
      })
      .attr("y", function(d){
        return d.y;
      })
      .attr("width", function(d){
        return barWidth + 0.5;
      })
      .attr("height", function(d){
        return (yScale(d.value)+15);
      })
      .style("fill", function(d){console.log(d);})
      .style("stroke", "none")
      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });

      // add date labels
      var tF = d3.timeFormat("%b %Y"),
      firstInMonth = {};

      svg.selectAll("text")
      .data(someData)
      .enter()
      .append("text")
      .attr("dy", 10)
      .style("text-anchor", "start")
      .style("font", "10px arial")
      .append("textPath")
      // only add for the first of each month
      .filter(function(d){
        var sd = tF(d.date);
        if (!firstInMonth[sd]){
          firstInMonth[sd] = 1;
          return true;
        }
        return false;
      })
      .text(function(d){
        return tF(d.date);
      })
      // place text along spiral
      .attr("xlink:href", "#spiral")
      .style("fill", "grey")
      .attr("startOffset", function(d){
        return ((d.linePer / spiralLength) * 100) + "%";
      })


      var tooltip = d3.select("#vis")
      .append('div')
      .attr('class', 'tooltip')
      .style('background', '#eee')
      .style('box-shadow', '0 0 5px #999999')
      .style('color', '#333')
      .style('font-size', '12px')
      .style('left', '130px')
      .style('padding', '10px')
      .style('position', 'absolute')
      .style('text-align', 'center')
      .style('top', '95px')
      .style('z-index', '10')
      .style('display', 'block')
      .style('opacity', '0');

      tooltip.append('div')
      .attr('class', 'date');
      tooltip.append('div')
      .attr('class', 'value');

      svg.selectAll("rect")
      .on('mouseover', function(d) {

        tooltip.select('.date').html("Date: <b>" + d.date.toDateString() + "</b>");
        tooltip.select('.value').html("Value: <b>" + Math.round(d.value*100)/100 + "<b>");

        d3.select(this)
        .style("fill","#FFFFFF")
        .style("stroke","#000000")
        .style("stroke-width","2px");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

      })
      .on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
        d3.selectAll("rect")
        .style("fill", function(d){return color(d.group);})
        .style("stroke", "none")

        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
      });
    }

    ionViewDidLoad() {
      console.log("home.ts - Entered home page");
     let userId = firebase.auth().currentUser.uid;
      this.menu.enable(true);
      let that = this;
      this._zone.run(() => {
        this.hardwareMemories.child(userId).on('value', function(snapshot) {
          let memories = (snapshot.val());
          if(memories){
            that.numMems =  Object.keys(memories).length;
            console.log("hardware MEMS");
            console.log(that.numMems);
          }
        });
      });
    }

  }
