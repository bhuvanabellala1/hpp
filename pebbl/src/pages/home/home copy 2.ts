import{Component}from'@angular/core';
import { NavController, MenuController}from 'ionic-angular';
import { CheckinPage}from '../checkin/checkin';
import {TimelinePage}from '../timeline/timeline';
import { AdventuresPage}from '../adventures/adventures';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
import {HttpProvider} from '../../providers/http-provider';
declare var d3: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CheckinService, HttpProvider]
})
export class HomePage {

  navPages: Array<{title: string, icon: string, path: string, component: any}>;
  public venuesData: any;
  public venue: any;

  constructor(public navCtrl: NavController, private checkinService: CheckinService,
  public menu: MenuController) {
    this.navPages = [
      { title: 'Timeline', icon: 'center', path: 'img/Timeline_Stretched.svg', component: TimelinePage },
      { title: 'Check In', icon: 'center', path: 'img/CheckIn.svg', component: CheckinPage },
      { title: 'Adventures', icon: 'center', path: 'img/Adventure_Stretched.svg', component: AdventuresPage }
    ];
    this.grabVenues();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  pushPage(page) {
    if(page.title == 'Check In'){
      this.navCtrl.push(page.component, {venue: this.venue,
                                          venueData: this.venuesData});
    }else{
      this.navCtrl.push(page.component);
    }
  }



  grabVenues(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.checkinService.searchVenues(resp.coords.latitude + "," + resp.coords.longitude)
      .then(data => {
        this.venuesData = data;
        this.venue = this.venuesData.response.venues[0];
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  createChart() { var flag = 0;
 var funcCalls = 0;

// some colour variables
  var tcBlack = "#130C0E";

// rest of vars
var w = 960,
    h = 800,
    maxNodeSize = 50,
    x_browser = 20,
    y_browser = 25,
    root;
 
var vis;
var force = d3.layout.force(); 

vis = d3.select("#vis").append("svg").attr("width", w).attr("height", h).attr("x",0);



var json = {
 "name": "Iron Throne",
 "img": "http://i66.tinypic.com/nn7adf.png",
 "children": [
  {
   "hero": "Khaleesi",
   "name": "Heroes",
   "img": "http://i63.tinypic.com/20rus85.png",
   "children": [
    {
      "hero": "Tyrion Lannister",
      "name": "Tyrion", 
      "link": "http://marvel.com/characters/54/spider-man",
      "img":  "http://i67.tinypic.com/2zemosp.png",
      "size": 40000,
      "house": "Lannister",
      "children": [
      {
        "hero": "House Lannister",
        "name": "Peter Benjamin Parker", 
        "link": "http://marvel.com/characters/54/spider-man",
        "img":  "http://awoiaf.westeros.org/images/thumb/d/d5/House_Lannister.svg/250px-House_Lannister.svg.png",
        "crest": "Yes",
        "house": "Lannister",
        "size": 40000
      }
      ]
    },
    {
      "hero": "Khal Drogo",
      "name": "Khal", 
      "link": "http://marvel.com/characters/9/captain_marvel",
      "img":  "http://i66.tinypic.com/34zysf8.png",
      "size": 40000
    },
    {
      "hero": "HULK", 
      "name": "Robert Bruce Banner",
      "link": "http://marvel.com/characters/25/hulk",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_hulk.png",
      "size": 40000
    },
    {
      "hero": "Black Widow", 
      "name": "Natalia 'Natasha' Alianovna Romanova",
      "link": "http://marvel.com/characters/6/black_widow",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_blackwidow.png",
      "size": 40000
    }
  ]
  },
  {
   "hero": "Cersei Lannister",
   "name": "Villains",
   "img":"http://i65.tinypic.com/24dngx2.png",
   "house":"Lannister",
   "children": [
    {
      "hero": "Tywin Lannister",
      "name": "Victor von Doom", 
      "link": "http://marvel.com/characters/13/dr_doom",
      "img":  "http://i67.tinypic.com/binsya.png",
      "house": "Lannister",
      "size": 40000
    },
    {
      "hero": "Jaime Lannister",
      "name": "Unrevealed", 
      "link": "http://marvel.com/characters/1552/mystique",
      "img":  "http://i64.tinypic.com/o8um9l.png",
      "house": "Lannister",
      "size": 40000
    },
    {
      "hero": "Thanos",
      "name": "Thanos", 
      "link": "http://marvel.com/characters/58/thanos",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/thanos.png",
      "size": 40000
    }
   ]
  },
  {
   "hero": "Jon Snow",
   "name": "Teams",
   "img": "http://i64.tinypic.com/16m4xhu.png",
   "house": "Stark",
   "children": [
    {
      "hero": "Samwell Tarly",
      "name": "", 
      "link": "http://marvel.com/characters/68/avengers",
      "img":  "http://i63.tinypic.com/25stq2t.png",
      "size": 40000
    },
    {
      "hero": "Arya Stark",
      "name": "", 
      "link": "http://marvel.com/characters/70/guardians_of_the_galaxy",
      "img":  "http://i65.tinypic.com/s47vyt.png",
      "size": 40000,
      "house": "Stark",
      "children": [
      {
        "hero": "House Stark",
        "name": "Peter Benjamin Parker", 
        "link": "http://marvel.com/characters/54/spider-man",
        "img":  "https://vignette4.wikia.nocookie.net/gameofthrones/images/8/8a/House-Stark-Main-Shield.PNG/revision/latest/scale-to-width-down/350?cb=20170101103142",
        "crest": "Yes",
        "house": "Stark",
        "size": 40000
      }
      ]
    },
    {
      "hero": "Sansa Stark",
      "name": "", 
      "link": "http://marvel.com/characters/534/defenders",
      "img":  "http://i65.tinypic.com/2uyppjp.png",
      "size": 40000,
      "house": "Stark",
      "children": [
      {
        "hero": "House Stark",
        "name": "Peter Benjamin Parker", 
        "link": "http://marvel.com/characters/54/spider-man",
        "img":  "https://vignette4.wikia.nocookie.net/gameofthrones/images/8/8a/House-Stark-Main-Shield.PNG/revision/latest/scale-to-width-down/350?cb=20170101103142",
        "crest": "Yes",
        "house": "Stark",
        "size": 40000
      }
      ]
    }
   ]
  }  
 ]
}



  root = json;
  root.fixed = true;
  root.x = w / 2;
  root.y = h / 4;
 
 
        // Build the path
  var defs = vis.insert("svg:defs")
      .data(["end"]);
 
 
  defs.enter().append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");
     update();
 
 
/**
 *   
 */
function update() {
  funcCalls++;
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

 
  // Restart the force layout.
  force.nodes(nodes)
        .links(links)
        .gravity(0.000005)
    .charge(-1500)
    .linkDistance(150)
    .friction(0.5)
    .linkStrength(function(l, i) {return 1; })
    .size([w, h])
    .on("tick", tick)
        .start();
 
   var path = vis.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });
 
    path.enter().insert("svg:path")
      .attr("class", "link")
      // .attr("marker-end", "url(#end)")
      .style("stroke", "#eee");
 
 
  // Exit any old paths.
  path.exit().remove();
 
 

  
  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id; });

  console.log(node);


 
  // Enter any new nodes.
  var nodeEnter = node.enter().append("svg:g")
      // .attr("id", function(d) {return d.name.split(' ')[0];})
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", click)
      .call(force.drag);



  // Append a circle
  nodeEnter.append("svg:circle")
      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
      .style("fill", "#eee");

      // Append images
    var images = nodeEnter.append("svg:image")
          .attr("xlink:href",  function(d) { return d.img;})
          .attr("x", function(d) { if (d.name == "Iron Throne"){ return -40} else {return -25;}})
          .attr("y", function(d) { if (d.name == "Iron Throne"){ return -40} else {return -25;}})
          .attr("height", function(d) { if (d.name == "Iron Throne"){ return 120} else {return 75;}})
          .attr("width", function(d) { if (d.name == "Iron Throne") {return 120} else {return 75;}});



  //   // Code to ensure the starting point of the viz is only the iron throne    
    if (funcCalls==1){
    nodes.forEach(function (a){
      if (a.crest!='Yes'){
        click(a)
      }
    })
  }



  // make the image grow a little on mouse over and add the text details on click
  var setEvents = images
          // Append hero text
          .on( 'click', function (clicked) {
              d3.select("h1").html(clicked.hero); 
              d3.select("h2").html(clicked.name); 
              d3.select("h3").html ("Take me to " + "<a href='" + clicked.link + "' >"  + clicked.hero + " web page ⇢"+ "</a>" );

              //Code to create the house focus functionality
              if (clicked.crest=="Yes") {
              d3.selectAll("image").attr('opacity',function(d) {if (d.house == clicked.house) {return 1} else {return 0.2;}});

              // images.attr('opacity', function(d) {if (d.house == clicked.house) {return 1} else {return 0.2;}});
            }

           }
           )

          .on( 'dblclick', function (clicked) {
              if (clicked.crest=="Yes") {
                d3.selectAll("image").attr('opacity',1);
                // images.attr('opacity', 1);
            }
              
           })

          .on( 'mouseenter', function() {
            // select element in current context
            d3.select( this )
              .transition()
              .attr("x", function(d) { if (d.name == "Iron Throne"){ return -90} else {return -60;}})
              .attr("y", function(d) { if (d.name == "Iron Throne"){ return -90} else {return -60;}})
              .attr("height", function(d) { if (d.name == "Iron Throne"){ return 200} else {return 120;}})
              .attr("width", function(d) { if (d.name == "Iron Throne"){ return 200} else {return 120;}})
              // .attr('opacity',0.2);
          })
          // set back
          .on( 'mouseleave', function() {
            d3.select( this )
              .transition()
              .attr("x", function(d) { if (d.name == "Iron Throne"){ return -40} else {return -25;}})
              .attr("y", function(d) { if (d.name == "Iron Throne"){ return -40} else {return -25;}})
              .attr("height", function(d) { if (d.name == "Iron Throne"){ return 120} else {return 75;}})
              .attr("width", function(d) { if (d.name == "Iron Throne"){ return 120} else {return 75;}})
              // .attr('opacity',1);;
          });

  // Append hero name on roll over next to the node as well
  nodeEnter.append("text")
      .attr("class", "nodetext")
      .attr("x", x_browser)
      .attr("y", y_browser +15)
      .attr("fill", tcBlack)
      .text(function(d) { return d.hero; });
 
 
  // Exit any old nodes.
  node.exit().remove();
 
 
  // Re-select for update.
  path = vis.selectAll("path.link");
  node = vis.selectAll("g.node");
 
function tick() {
 
 
    path.attr("d", function(d) {
 
     var dx = d.target.x - d.source.x,
           dy = d.target.y - d.source.y,
           dr = Math.sqrt(dx * dx + dy * dy);
           return   "M" + d.source.x + "," 
            + d.source.y 
            + "A" + dr + "," 
            + dr + " 0 0,1 " 
            + d.target.x + "," 
            + d.target.y;
  });
    node.attr("transform", nodeTransform);    
  }
}

 
/**
 * Gives the coordinates of the border for keeping the nodes inside a frame
 * http://bl.ocks.org/mbostock/1129492
 */ 
function nodeTransform(d) {
  d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
    d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
    return "translate(" + d.x + "," + d.y + ")";
   }
 
/**
 * Toggle children on click.
 */ 
function click(d) {

  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  flag = 1;
  update();
}
 
 
/**
 * Returns a list of all nodes under the root.
 */ 
function flatten(root) {
  var nodes = []; 
  var i = 0;
 
  function recurse(node) {
    if (node.children) 
      node.children.forEach(recurse);
    if (!node.id) 
      node.id = ++i;
    nodes.push(node);
  }
 
  recurse(root);
  return nodes;
} 
  
}
  ionViewDidLoad() {
    console.log("Entering home page - enabling menu");
    this.menu.enable(true);
  }

}
