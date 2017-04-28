import{Component, NgZone}from'@angular/core';
import { NavController, MenuController}from 'ionic-angular';
import { CheckinPage}from '../checkin/checkin';
import { BluetoothPage }from '../bluetooth/bluetooth';
import { TimelinePage }from '../timeline/timeline';
import { AdventuresPage}from '../adventures/adventures';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
import { PebblPage } from '../pebbl/pebbl';
declare var d3: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CheckinService]
})
export class HomePage {

  navPages: Array<{title: string, icon: string, path: string, component: any}>;
  // public venuesData: any;
  // public venue: any;

  constructor(private _zone: NgZone, public navCtrl: NavController, private checkinService: CheckinService,
  public menu: MenuController) {
    this.navPages = [
      { title: 'Timeline', icon: 'center', path: 'img/Timeline_blue.svg', component: TimelinePage },
      { title: 'Check In', icon: 'center', path: 'img/CheckIn.svg', component: CheckinPage },
      { title: 'Adventures', icon: 'center', path: 'img/Adventure_Stretched.svg', component: AdventuresPage }
    ];
    let key = <string><any>(Date.now() / 1000);
  }

  pushPage(page) {
      this.navCtrl.push(page.component);
  }

  pushInstantMemory(){
    this.navCtrl.push(PebblPage);
  }

  createChart() {

    console.log("enetered chart making");
    var width = 500,
        height = 550,
        nodes = [], //Where all circles are stored
        maxSpeed = 1.5,
        padding = 1,
        m = 4,
        // Number of balls we want
        n = 40,
        activity = ['Taking a break', 'Taking a walk', 'Golden Poppies', 'Enjoying the sun', 'Team Meeting', 'Walking to School', 'Starting the day', 'Chilling', 'Pratik & Carlo', 'Carlo & Shirish', 'Getting Money', 'Party It Up', 'Hardware'],
        date = ['April 18th 2017', 'April 16th 2017', 'April 14th 2017', 'April 12th 2017', 'April 10th 2017', 'April 10th 2017', 'April 8th 2017', 'April 8th 2017'],
        location = ['campanille', 'campanille', 'Alameda Beach', 'UC Berkeley', 'School of Information', 'UC Berkeley', 'Daniel\'s House', 'campanille', 'Hawaii', 'Carina\'s House', 'The House', 'Robin\'s House', 'HPP'],
        photo = ['m1.JPG','m2.JPG','m3.JPG','m4.JPG','m5.JPG','m6.JPG','m7.JPG','m8.JPG', 'm9.jpg','m11.jpg', 'm12.jpg', 'm13.jpg', 'm14.jpg'],
        radius = d3.scale.sqrt().range([0, 8]),
        // Creating a rectangle to control the boundary of the ball
        rect = [50,50, width - 50, height - 50],
        // Where memory card is stored.
        card = d3.select("body").selectAll("div.card"),
        // Color Pallet
        color = d3.scale.ordinal().range([d3.rgb(255,186,73), d3.rgb(84,195,194), d3.rgb(75,181,217), d3.rgb(222,243,243)]).domain(d3.range(m));

        // Creating circles
        for (var i in d3.range(n)){
          var j = parseInt(i) % 13
          var k = parseInt(i) % 8
          nodes.push({radius: radius(1 + Math.floor(Math.random() * 4)),
          // x & y positions on canvas
          x: rect[0] + (Math.random() * (rect[2] - rect[0])),
          y: rect[1] + (Math.random() * (rect[3] - rect[1])),
          activity: activity[j],
          date: date[k],
          location: location[j],
          photo: photo[j],
          // Horizontal & Vertical Speed
          speedX: (Math.random() - 0.5) * 2 *maxSpeed,
          speedY: (Math.random() - 0.5) * 2 *maxSpeed});
        }
    // Make the first
    var root = nodes[0]
    root.radius = 0;
    root.fixed = true;

    // Force Layout
    var force = d3.layout.force()
        .gravity(0)
        // charge determines the force applied to the cluster
        .charge(function(d, i) { return i ? 0 : -300; })
        .nodes(nodes)
        .size([width, height])
        .on("tick", tick)
        .start();

    var svgDiv = document.getElementById('mySvg');

    // Creating the canvas
    var svg = d3.select("#mySvg")

    // Creating circles on canvas
    var circle;
    this._zone.run(() => {
      console.log("fsdfsd")
    circle = svg.selectAll("circle")
        .data(nodes.slice(1))
        .enter().append("circle")
        .attr("r", function(d) { return d.radius; })
        .attr("cx", function(d, i) { return d.x})
        .attr("cy", function(d, i) { return d.y})
        .attr("date", function(d, i) { return d.date})
        .attr("location", function(d, i) { return d.location})
        .attr("activity", function(d, i) { return d.activity})
        .attr("photo", function(d, i) { return d.photo})
        .style("fill", function(d, i) { return color(i); });
      });

    //Firstly, it create a quadtree object, using the coordinate of the nodes.
    //Then the quadtree call the visit() to check whether it have collision.
    //We will check the collide method later, but from the code suggests,
    //it change the (x,y) coordinate so we need to update the cx and cy attribute accordingly.
    function tick(e) {

    force.alpha(0.1)
    circle
      // This sets the boundary for collision
      .each(gravity(e.alpha))
      .each(collide(.5))
      // Updating location and making sure it doesnt go outside of the boundary
      .attr("cx", function(d) { return d.x = Math.max(d.radius, Math.min(width - d.radius, d.x)); })
      .attr("cy", function(d) { return d.y = Math.max(d.radius, Math.min(height - d.radius, d.y)); })
      //allows dragging
      .call(force.drag()
        .on("drag", dragged));
    };

    function dragged(d) {
      var activity = d.activity, location = d.location, date = d.date, photo = d.photo;
      var image = <HTMLImageElement>document.getElementById('memeoryImage');
      image.src = "img/memory/" + d.photo;
      document.getElementById("date").innerHTML = date;
      document.getElementById("location").innerHTML = location;
      document.getElementById("activity").innerHTML = activity;
      card.style("visibility", "visible");
      setTimeout(function() {
        card.style("visibility", "hidden");
      }, 5000);
    }

    // This code transit the mouse position as the fixed root node. when the mouse moves,
    // the layout redefine the root position and recalculate the layout.
    svg.on("mousemove", function() {
      var p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });

    // Move nodes toward cluster focus.
    function gravity(alpha) {
      return function(d) {
        if ((d.x - d.radius - 2) < rect[0]) d.speedX = Math.abs(d.speedX);
        if ((d.x + d.radius + 2) > rect[2]) d.speedX = -1 * Math.abs(d.speedX);
        if ((d.y - d.radius - 2) < rect[1]) d.speedY = -1 * Math.abs(d.speedY);
        if ((d.y + d.radius + 2) > rect[3]) d.speedY = Math.abs(d.speedY);
        d.x = d.x + (d.speedX * alpha);
        d.y = d.y + (-1 * d.speedY * alpha);
      };
    }

    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function(d) {
        var r = d.radius + radius.domain()[1] + padding,
        // var r = d.radius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            // r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
            r = 33.31370849898476;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
  }
  ionViewDidLoad() {
    console.log("Entering home page");
    this.menu.enable(true);
    this.createChart();

  }

}
