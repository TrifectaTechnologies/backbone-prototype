(function(e){function l(a){var a=a.substr(1),f=a.match(/\(([^\)]+)\)/g)||[];if(!(a in e.mockJSON.data))return console.log(a),console.log(f),a;a=e.mockJSON.data[a];switch(n(a)){case "array":return f=Math.floor(a.length*h()),a[f];case "function":return a()}}function n(a){return e.isArray(a)?"array":a===null?"null":typeof a}function k(a){return a<10?"0"+a:a+""}function h(){return e.mockJSON.random?Math.random():(m=m.concat(m.splice(0,1)),m[0])}function i(){return new Date(Math.floor(h()*(new Date).valueOf()))}
var j=[];e.mockJSON=function(a,f){for(var b=0;b<j.length;b++)if(j[b].request.toString()==a.toString()){j.splice(b,1);break}j.push({request:a,template:f});return e};e.mockJSON.random=!0;var o=e.ajax;e.ajax=function(a){if(a.dataType==="json")for(var f=0;f<j.length;f++){var b=j[f];if(b.request.test(a.url))return a.success(e.mockJSON.generateFromTemplate(b.template)),e}return o.apply(this,arguments)};e.mockJSON.generateFromTemplate=function(a,f){var b=0,g=(f||"").match(/\w+\|(\d+)-(\d+)/);if(g)var c=
parseInt(g[1],10),b=parseInt(g[2],10),b=Math.round(h()*(b-c))+c;c=null;switch(n(a)){case "array":for(var c=[],d=0;d<b;d++)c[d]=e.mockJSON.generateFromTemplate(a[0]);break;case "object":c={};for(d in a)if(c[d.replace(/\|(\d+-\d+|\+\d+)/,"")]=e.mockJSON.generateFromTemplate(a[d],d),(g=d.match(/\w+\|\+(\d+)/))&&n(a[d])=="number")g=parseInt(g[1],10),a[d]+=g;break;case "number":c=g?b:a;break;case "boolean":c=g?h()>=0.5:a;break;case "string":if(a.length){c="";b=b||1;for(d=0;d<b;d++)c+=a;g=c.match(/@([A-Z_0-9\(\),]+)/g)||
[];for(d=0;d<g.length;d++)b=g[d],c=c.replace(b,l(b))}else{c="";for(d=0;d<b;d++)c+=String.fromCharCode(Math.floor(h()*255))}break;default:c=a}return c};var m=[0.021768910889510606,0.23762323165420307,0.9079616118204306,0.6534305309997466,0.22049697572443694,0.07687466163364898,0.8017428775547905,0.16165353264404825,0.5124345671670483,0.19337327636624613,0.39963994200698416,0.8012592654139514,0.22474962687229938,0.9791396234452399,0.7965428353317756,0.9777664340629622,0.5135216702983731,0.7407128236192145,
0.12880984991420075,0.8186600800491484,0.5187691445438851,0.034723021925916586,0.5625092833040853,0.02502838571997701,0.663696305503698,0.3481608684353138,0.8991623585175106,0.3640542564277087,0.8320766874121723,0.012778915627689846,0.1427680370061336,0.9774408289203956,0.010229381207667587,0.2596610885223093,0.6150540104297127,0.7130773919030915,0.8638338302974085,0.6178483032907357,0.980312844391733,0.5007277415012348,0.6348672031113127,0.4400097775503303,0.8468458451408212,0.38724997893647317,
0.690237920987028,0.19850102297146477,0.44895115941315766,0.22283381913760725,0.031228117310125314,0.3367510872581615,0.28155752394210787,0.14696694832580504,0.08164635161760991,0.8837733477785624,0.4590179148539142,0.9613195413217465,0.11263127577456922,0.743695635896287,2.424891439143373E-4,0.1964622832546613,0.7333363138878922,0.5575568682003356,0.20426374168098604,0.18030934250338893,0.9792636408392759,0.30121911048336913,0.7734906886720265,0.6984051127767527,0.6638058511379343,0.3310956256388182,
0.36632372827973203,0.8996494702333895,0.8235917663049763,0.418496734118911,0.8164648495097332,0.9457831606354686,0.2845227542117049,0.42374718399151545,0.3431728911657228,0.5289314006219973,0.6029243600407113,0.6528301140700757,0.6948768236197832,0.7887302784092911,0.8950274196119906,0.6121642239166305,0.31797481561514696,0.34903732589844216,0.3580320092281766,0.8312225728434115,0.32331010157206974,0.16395388672837796,0.6072960306003872,0.6580526967999424,0.23472961545632742,0.6138637855489343,0.3067303339060682,
0.44935935129958315,0.24729465243280668,0.8244189715967711];e.mockJSON.data={NUMBER:"0123456789".split(""),LETTER_UPPER:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),LETTER_LOWER:"abcdefghijklmnopqrstuvwxyz".split(""),MALE_FIRST_NAME:"James,John,Robert,Michael,William,David,Richard,Charles,Joseph,Thomas,Christopher,Daniel,Paul,Mark,Donald,George,Kenneth,Steven,Edward,Brian,Ronald,Anthony,Kevin,Jason,Matthew,Gary,Timothy,Jose,Larry,Jeffrey,Frank,Scott,Eric".split(","),FEMALE_FIRST_NAME:"Mary,Patricia,Linda,Barbara,Elizabeth,Jennifer,Maria,Susan,Margaret,Dorothy,Lisa,Nancy,Karen,Betty,Helen,Sandra,Donna,Carol,Ruth,Sharon,Michelle,Laura,Sarah,Kimberly,Deborah,Jessica,Shirley,Cynthia,Angela,Melissa,Brenda,Amy,Anna".split(","),
LAST_NAME:"Smith,Johnson,Williams,Brown,Jones,Miller,Davis,Garcia,Rodriguez,Wilson,Martinez,Anderson,Taylor,Thomas,Hernandez,Moore,Martin,Jackson,Thompson,White,Lopez,Lee,Gonzalez,Harris,Clark,Lewis,Robinson,Walker,Perez,Hall,Young,Allen".split(","),EMAIL:function(){return l("@LETTER_LOWER")+"."+l("@LAST_NAME").toLowerCase()+"@"+l("@LAST_NAME").toLowerCase()+".com"},DATE_YYYY:function(){return i().getFullYear()+""},DATE_DD:function(){return k(i().getDate())},DATE_MM:function(){return k(i().getMonth()+
1)},TIME_HH:function(){return k(i().getHours())},TIME_MM:function(){return k(i().getMinutes())},TIME_SS:function(){return k(i().getSeconds())},LOREM:function(){var a="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "),
f=Math.floor(h()*a.length);return a[f]},LOREM_IPSUM:function(){for(var a="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "),
f=[],b=Math.floor(h()*a.length/2),e=0;e<b;e++){var c=Math.floor(h()*a.length);f.push(a[c])}return f.join(" ")}}})(jQuery);