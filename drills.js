// Drill library data: categories, drills and global cues.
// Loaded by index.html before the main script. Each drill's `anim` is the
// name of a diagram animation function in index.html; it is resolved to
// the function when the main script starts.

// ─── DATA ────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:'warmup',    name:'Warm-Up',    icon:'🔥', color:'#ff6eb4', bg:'rgba(255,110,180,0.1)'  },
  { id:'defending', name:'Defending',  icon:'🛡️', color:'#5ab4ff', bg:'rgba(90,180,255,0.1)'   },
  { id:'attacking', name:'Attacking',  icon:'⚡', color:'#ffb830', bg:'rgba(255,184,48,0.1)'   },
  { id:'movement',  name:'Movement',   icon:'🏃', color:'#3ddfc8', bg:'rgba(61,223,200,0.1)'   },
  { id:'skills',    name:'Skills',     icon:'⚽', color:'#a8e63d', bg:'rgba(168,230,61,0.1)'   },
  { id:'setpiece',  name:'Set Pieces', icon:'🎯', color:'#b87fff', bg:'rgba(184,127,255,0.1)'  },
  { id:'match',     name:'Training Match', icon:'🏟️', color:'#ff8a5b', bg:'rgba(255,138,91,0.1)' },
  { id:'goalkeeper', name:'Goalkeeper', icon:'🧤', color:'#ffd23f', bg:'rgba(255,210,63,0.1)' },
  { id:'attackdef', name:'Attack v Defence', icon:'⚔️', color:'#cbd5e1', bg:'rgba(203,213,225,0.1)' },
];

const DRILLS = [
  // ── WARM-UPS ──
  {
    id:'w1', cat:'warmup', name:'Freeze Tag Defenders', duration:8,
    setup:'20×15m grid. 2–3 defenders (bibs). Attackers move freely with a ball each. Defenders freeze attackers by touching their ball. Frozen players stand with feet apart — a free attacker can nutmeg them to unfreeze. Rotate defenders every 90 seconds.',
    points:['Sprint to close, then SLOW as you get near','Check over your shoulder — where are the other attackers?','Rotate defenders every 90 seconds'],
    progression:'Defenders must freeze 3 players before the timer. Score it.',
    cues:['Head on a swivel','Fast approach','Talk!'],
    diagram:'freeze', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=9oBc20ywJ5M',label:'Freeze Tag Defenders warm-up'},
    anim: 'animFreeze'
  },
  {
    id:'w2', cat:'warmup', name:'Shark Attack', duration:8,
    setup:'30×20m grid. 3 defenders in the middle ("sharks"). Attackers with balls line up at one end and try to dribble to the other. If a shark kicks a ball out, that attacker joins the sharks. Last one with a ball wins.',
    points:['Sharks: close quickly, pick your moment','Attackers: use changes of speed and direction','Keep your head up — scan for gaps'],
    progression:'Sharks must stay in a zone — forces coordination between them.',
    cues:['Low body position','Fake and go!','Protect the ball'],
    diagram:'shark', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=xi9sut-iLN0',label:'Shark Attack dribbling game'},
    anim: 'animShark'
  },
  {
    id:'w3', cat:'warmup', name:'Traffic Lights', duration:6,
    setup:'Large grid 25×25m. All players dribbling freely. Coach shouts colours: RED = stop (foot on ball), AMBER = slow dribble, GREEN = fast dribble. Add: BLUE = turn 180°, YELLOW = move to nearest player and high-five.',
    points:['Keep the ball close at all speeds','Scan the grid — avoid collisions','React fast to commands'],
    progression:'Players give commands instead of the coach.',
    cues:['Head up!','Soft touches','Quick feet'],
    diagram:'traffic', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=rNih_5ZY8SQ',label:'Traffic Lights dribbling drill'},
    anim: 'animTraffic'
  },
  {
    id:'w4', cat:'warmup', name:'Rondo 4v1', duration:8,
    setup:'Small circle or 8×8m square. 4 players around the outside, 1 defender in the middle. Outer players keep possession with one or two touch passing. Defender wins ball = they swap with the player who lost it.',
    points:['Move to create passing angles after every pass','Defender: press the player on the ball immediately','Quick feet — be ready before the ball arrives'],
    progression:'Add second defender (5v2). Limit to one touch.',
    cues:['"Show" for the ball','Body shape open','Press on bad touch'],
    diagram:'rondo', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=c_nq0Ka_RWs',label:'4v1 Rondo — beginners guide'},
    anim: 'animRondo'
  },
  {
    id:'w5', cat:'warmup', name:'Bumper Cars', duration:6,
    setup:'All players dribbling in a grid. Aim: use your body/shoulder to barge OTHER players off their ball while protecting your own. If your ball leaves the grid you join a smaller grid. Last player wins.',
    points:['Keep ball under control while pressuring others','Shield with your body — use your arms legally','Peripheral vision — never just watch your ball'],
    progression:'Players can only use their weaker foot.',
    cues:['Low centre of gravity','Protect your ball','Head up!'],
    diagram:'bumper', viewBox:'0 0 300 160',
    anim: 'animBumper'
  },
  // ── DEFENDING ──
  {
    id:'d0', cat:'defending', name:"Don't Dive In", duration:10,
    setup:"Mark a line 25 yards long. Two small goals are placed behind the defender, spread evenly across the 25 yards (roughly at the 8 and 17 yard marks). Attacker stands on one side of the line with the ball, defender on the other side facing them. Neither player can cross the line. The attacker moves side to side along the line trying to get a shooting angle to score in either goal. The defender mirrors them, staying goalside and blocking angles. Swap roles after 5 attempts.",
    points:['Stay light on your feet — small shuffle steps, never cross your legs','Keep your body between the attacker and the nearest goal at all times','Don\'t lunge or dive across — stay balanced and make yourself big','Watch the ball, not the attacker\'s body — feet give away the shot','Force the attacker to the wider angles away from both goals'],
    progression:'Give the attacker a 3-second time limit to force quicker decisions. Add a second defender to cover both goals.',
    cues:["Don't dive in!",'Mirror their movement','Stay balanced','Watch the ball','Make yourself big'],
    diagram:'dontdivein', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=uVkpeXS6Byw',label:"Don't Dive In — 1v1 Defending Drill"},
    anim: 'animDontDiveIn'
  },
  {
    id:'d1', cat:'defending', name:'Sprint & Slow Drill', duration:12,
    setup:'Pairs. Attacker stands still at a cone 12m away with a ball. On your call, defender sprints toward them, SLOWS at 2–3m, drops into side-on defensive shape. 5 reps then swap.',
    points:['"Fast approach, slow arrival"','Side-on stance: one foot forward, low and balanced','Force attacker to their weaker foot or touchline',"Don't lunge — wait for the ball to move away"],
    progression:'Attacker dribbles slowly — defender practises live jockeying.',
    cues:['Fast approach slow arrival','Side-on','Get goalside',"Don't dive in"],
    diagram:'sprintslow', viewBox:'0 0 300 140',
    anim: 'animSprintSlow'
  },
  {
    id:'d2', cat:'defending', name:'Heads-Up Defending', duration:12,
    setup:'20×20m grid with small goal. 1 defender, 1 live attacker with ball, 1 SHADOW attacker near edge without ball. You shout "Pass!" — ball goes to shadow who immediately becomes live.',
    points:['Scan constantly — quick glances for the second attacker','Position to see BOTH the ball and the threat','Shout "Man on! Second runner!"',"Don't fully commit until you know where both are"],
    progression:'Add a second defender — who closes? Who covers?',
    cues:['Head on a swivel','Talk!','Half-turn body'],
    diagram:'awareness', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=gHVXwse0MU8',label:'Defensive awareness & scanning'},
    anim: 'animAwareness'
  },
  {
    id:'d3', cat:'defending', name:'3v2 Defending Game', duration:18,
    setup:'3 attackers vs 2 defenders, 30×20m, with a goal. Attackers score normally. Defenders score by winning ball and dribbling over halfway. CONDITION: nearest defender must close within 3 seconds or attackers get a free shot.',
    points:['Nearest defender: press immediately','Second defender: hold, scan, communicate','Delay attack until help arrives',"Don't both chase the ball"],
    progression:'4v3. Praise when defenders close quickly AND communicate.',
    cues:['Delay!','Cover!','Talk!','Force wide'],
    diagram:'game', viewBox:'0 0 300 180',
    anim: 'animGame'
  },
  {
    id:'d3b', cat:'defending', name:'Transition Press — 2 Goal Counter', duration:15,
    setup:'Set up a central goal with a keeper, defended by 2 blue defenders, with two "transition zones" either side each having its own small goal at the far end. 2 reds (attackers) attack the central goal against the keeper and 2 blues, with the coach feeding balls in. An extra blue waits in each transition zone near the main goal end. As soon as the reds score, miss, or the blues clear the ball, BOTH extra blues immediately dribble the length of their zone and try to score in their small goal. The instant that happens, both reds become defenders — one sprints into each zone to press and try to win the ball back before the blue can score.',
    points:['Reds: react instantly the moment possession is lost — sprint to press, don\'t jog back','Blues: as soon as you win it, drive forward at pace into your zone — don\'t delay','Each red must recognise and close down THEIR nearest blue - don\'t both chase one','Communicate the transition moment loudly — "Transition! Press!"'],
    progression:'Reduce reaction time allowed before the press must start. Add a second wave — winning team must then defend again immediately.',
    cues:['Transition!','Press instantly!','Drive forward!','React, don\'t jog'],
    diagram:'transitionpress', viewBox:'0 0 300 200',
    youtube:{url:'https://www.youtube.com/watch?v=Hh-P-BF0VAM',label:'Transition press — 2 goal counter'},
    anim: 'animTransitionPress', animMs: 8000
  },
  {
    id:'d4', cat:'defending', name:'Gates Defending', duration:12,
    setup:'Scatter 8 small cone gates (1m wide) around a 25×25m grid. Attackers score by dribbling through any gate. 2 defenders try to stop them. Defenders cannot guard a gate — they must close down.',
    points:['Stay central — cover the most gates possible','Close down immediately when attacker approaches a gate','Communicate with partner — split the grid','Force attacker away from nearest gate'],
    progression:'3 attackers vs 2 defenders. Add more gates.',
    cues:['Stay central','Close angles','Force wide','Talk!'],
    diagram:'gates', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=MDF6tB5foI0',label:'Gates game — defending & attacking'},
    anim: 'animGates'
  },
  {
    id:'d5', cat:'defending', name:'1v1 Channel Defending', duration:10,
    setup:'4m wide × 15m long channel with a small goal at each end. 1v1 — attacker tries to score, defender tries to win ball and score in other goal. Narrow channel forces proper defensive technique.',
    points:['Engage — you cannot avoid in a narrow channel','Get side-on immediately','Force to weaker foot','Wait for the wrong touch before tackling'],
    progression:'Attacker gets a bonus if they score within 5 seconds — tests speed of closing.',
    cues:['Side-on','Patience','Pick your moment'],
    diagram:'channel', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=h1mie6_Axss',label:'1v1 channel defending'},
    anim: 'animChannel'
  },
  // ── ATTACKING ──
  {
    id:'a1', cat:'attacking', name:'1-2 Combination Play', duration:12,
    setup:'Groups of 3 in a 15×10m area. Player A passes to B, makes an overlapping run. B plays a one-two back to A who crosses or shoots. Rotate positions after 3 reps.',
    points:['Weight of pass must be perfect for the one-two','Make the run early — before the pass','Disguise the pass — make the defender commit'],
    progression:'Add a passive then active defender.',
    cues:['Early run','Firm pass','Head up'],
    diagram:'onetwo', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=EoiXfAjpcV0',label:'1-2 combination play drill'},
    anim: 'animOneTwo'
  },
  {
    id:'a2', cat:'attacking', name:'2v1 Overload Attack', duration:12,
    setup:'20×15m area. 2 attackers vs 1 defender + goalkeeper. Attackers start from halfway, defender from edge of box. Attackers must score. Reset after each attempt.',
    points:['Attacker with ball: draw the defender, release early','Second attacker: move to create the angle','Never stand still — movement creates the chance'],
    progression:'Defender gets a point for each turnover. Race to 5.',
    cues:['Draw and release','Move off the ball','Be decisive'],
    diagram:'twovone', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=TYECdqSrZNk',label:'2v1 attacking overload'},
    anim: 'animTwoVOne'
  },
  {
    id:'a3', cat:'attacking', name:'Finishing Zones', duration:15,
    setup:'Mark 3 zones in front of goal: Zone 1 (penalty spot area) = 1pt, Zone 2 (edge of box) = 2pts, Zone 3 (outside box) = 3pts. Players take turns shooting from each zone. 10 shots each.',
    points:['Strike through the middle of the ball for power','Pick a corner — commit before shooting','Approach at a slight angle for better technique'],
    progression:'Add a server who feeds balls moving. Player must control then shoot.',
    cues:['Head down on contact','Pick your corner','Follow up for rebounds'],
    diagram:'finishing', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=y-X_t1KVO7o',label:'Finishing zones shooting drill'},
    anim: 'animFinishing'
  },
  {
    id:'a4', cat:'attacking', name:'Pressing Triggers Game', duration:15,
    setup:'4v4 + goalkeepers in a 40×30m area. Introduce TRIGGERS: when the GK has ball, when there is a back pass, or when an attacker takes a heavy touch. On a trigger the whole team PRESSES together immediately.',
    points:['Recognise the trigger instantly','Nearest player closes fast — team compresses behind','Force the ball wide and backward','No ball-watching — move as a unit'],
    progression:'Coach calls "trigger" randomly to test reaction. Point for a press that wins ball in 4 seconds.',
    cues:['Trigger!','Press now!','Close space','No easy out'],
    diagram:'pressing', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=qVKS2p7WxaY',label:'Pressing triggers game'},
    anim: 'animPressing'
  },
  // ── MOVEMENT ──
  {
    id:'m1', cat:'movement', name:'Defensive Shadow Drill', duration:8,
    setup:'Pairs, no ball. Attacker moves freely in a 5×5m area — slow jogs, sidesteps, changes of direction. Defender shadows them, staying 1m away, maintaining side-on shape. 60 seconds each.',
    points:['Low centre of gravity — bend your knees','Small quick steps — never cross your feet','Stay 1 arm\'s length away at all times','Mirror every movement before it happens'],
    progression:'Attacker speeds up. Add a ball for live 1v1.',
    cues:['Small steps','Stay side-on','Mirror them','Low!'],
    diagram:'shadow', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=d3yc7Sgl7X0',label:'Defensive shadow drill'},
    anim: 'animShadow'
  },
  {
    id:'m2', cat:'movement', name:'Agility Ladder Footwork', duration:10,
    setup:'Lay an agility ladder flat (or cones 40cm apart in two lines). No ball. One player at a time goes through, the next starts when they reach halfway. 8 drills, 2 or 3 goes each: 1 Classic - one foot in each box, one step at a time. 2 Two feet in - both feet in every box, one at a time. 3 Side to side - one foot at a time in each box, moving laterally to the right then back to the left (zig-zag). 4 In and out - jump and land both feet in a box, jump again and land with legs either side of the ladder, then back into the next box. 5 One foot in - like the classic but only one foot goes in the ladder, the other stays outside. Do both feet. 6 Backwards side to side - the side-to-side zig-zag moving backwards. 7 Sideways - stand side-on (facing left or right) and step one foot at a time into each box. 8 Twist - one foot inside, one outside; jump and rotate the hips so the outside foot lands inside and the inside foot outside.',
    points:['Technique first - get the pattern right before going faster','Light and quick on the balls of the feet, arms pumping','Do every drill with both feet leading (and facing both ways for Sideways)'],
    progression:'Once the pattern is clean, go faster. Advanced: race a partner on a second ladder, or finish with a sprint to a ball and a shot.',
    cues:['Light feet','Pattern first, then speed','Both feet'],
    diagram:'ladder', viewBox:'0 0 300 160',
    youtube:{url:'https://www.youtube.com/watch?v=hlJW5q8s2z0',label:'Ladder drills for youth players (8 drills)'},
    anim: 'animLadder', animMs: 6000
  },
  {
    id:'m3', cat:'movement', name:'Third Man Runs', duration:12,
    setup:'Groups of 4 in a 20×15m area. A passes to B. As soon as A passes, C makes a diagonal run. B plays through ball for C. D follows up. Rotate and repeat from opposite side.',
    points:['Third man run must happen as soon as A passes','Time the run — don\'t go too early','B must have vision to see the run before receiving'],
    progression:'Add passive defender on C\'s run. Work both sides.',
    cues:['Run on the pass','Time it!','See the picture early'],
    diagram:'thirdman', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=w8PbZQHf83M',label:'Third man runs drill'},
    anim: 'animThirdMan'
  },
  // ── SKILLS ──
  {
    id:'s1', cat:'skills', name:'Coervers Skill Circuit', duration:12,
    setup:'Cones 2m apart in a line of 6. Players dribble through using Coervers moves: inside cut, outside cut, step-over, drag-back, Cruyff turn. One move per cone. Return using different moves.',
    points:['Exaggerate each move — make it convincing','Keep ball close — no big touches','Speed up as confidence builds','Weight on non-kicking foot for balance'],
    progression:'Add a passive defender at the last cone. Perform move to beat them.',
    cues:['Sell the dummy','Quick feet','Stay balanced'],
    diagram:'coervers', viewBox:'0 0 300 160',
    youtube:{url:'https://www.youtube.com/watch?v=IeMYh7roBjk',label:'Coervers skill moves circuit'},
    anim: 'animCoervers'
  },
  {
    id:'s2', cat:'skills', name:'Weak Foot Pairs', duration:10,
    setup:'Pairs 8m apart. ALL passing and receiving with the weaker foot only. Start with stationary passing, progress to movement. Any strong foot touch = opposition gets a point.',
    points:['Square up the body — point toe toward target','Follow through in direction of pass','Accept it will be harder — keep quality up'],
    progression:'Add a mini goal — both players shoot with weak foot only.',
    cues:['Square your hips','Follow through','Commit to it'],
    diagram:'weakfoot', viewBox:'0 0 300 160',
    youtube:{url:'https://www.youtube.com/watch?v=xlHnFTEarKI',label:'Weak foot training drill'},
    anim: 'animWeakFoot'
  },
  {
    id:'s3', cat:'skills', name:'Receiving Under Pressure', duration:12,
    setup:'Player in middle of a triangle (5m sides). Three feeders take turns playing in balls — on the ground, in the air, low driven. Receiver controls, turns 90° and passes to a different feeder each time. 60 sec then swap.',
    points:['Open body shape before the ball arrives','Let the ball travel across your body for a sideways touch','Shield the first touch if under pressure'],
    progression:'Feeder follows their pass to apply light pressure. Receiver must protect.',
    cues:['Open up early','Soft touch','Half-turn before ball arrives'],
    diagram:'receiving', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=8xfWkNLdVYE',label:'Receiving under pressure drill'},
    anim: 'animReceiving'
  },
  {
    id:'w6', cat:'warmup', name:'Tail Tag', duration:6,
    setup:'All players tuck a bib into their shorts as a "tail". Dribble freely in a 20×20m grid and try to steal other players\' tails while protecting your own. If your tail is taken, do 5 toe-taps on the spot to get a new one from the coach.',
    points:['Keep the ball under close control while looking up','Use your body to shield the ball and your tail','Quick direction changes to protect your tail'],
    progression:'Anyone who loses their tail joins a smaller inner grid — increases intensity.',
    cues:['Protect your tail!','Head up','Use your body'],
    diagram:'traffic', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=O8Vk3sBsPa8',label:'Tail Tag dribbling drill'},
    anim: 'animTailTag'
  },
  {
    id:'w7', cat:'warmup', name:'Pac-Man', duration:7,
    setup:'Mark a grid with lines of cones forming a maze (4×4 or 5×5 grid of corridors). Players dribble along the corridors only — can\u2019t cut across open space. 1-2 players without balls are "ghosts" and try to tag dribblers. Tagged players freeze and can be freed by a teammate passing through their corridor.',
    points:['Stay in the corridors — no shortcuts','Head up to see the ghosts coming','Use quick turns to change direction in tight spaces'],
    progression:'Add more ghosts. Limit to weak foot only.',
    cues:['Quick feet','Head up','Sharp turns'],
    diagram:'bumper', viewBox:'0 0 300 160',
    youtube:{url:'https://www.youtube.com/watch?v=QMjbiNrJGMU',label:'Pac-Man football warm-up'},
    anim: 'animPacMan'
  },
  {
    id:'w8', cat:'warmup', name:'Protect the King', duration:8,
    setup:'Groups of 5 + 1–2 chasers. One player is the King — they tuck a bib (tail) into the back of their shorts. The King links arms with 4 teammates to form a group of 5 moving together. The chasers on the outside try to grab the King\'s tail. The whole group rotates and moves together to keep the tail away from the chasers. When a chaser grabs the tail, rotate the King to a new player.',
    points:['Shielding group: move as one — no gaps','Communicate constantly — "left!", "right!", "behind you!"','King: stay central, trust your teammates','Chasers: look for gaps — fake one way and go the other'],
    progression:'Add a second chaser. Time how long each King survives — try to beat the record.',
    cues:['Move together!','No gaps!','Talk!','Stay tight'],
    diagram:'protectking', viewBox:'0 0 300 180',
    youtube:{url:'https://www.instagram.com/reel/DURSlOBkg5I/',label:'Watch: Protect the King (Instagram)'},
    instagram:{url:'https://www.instagram.com/reel/DURSlOBkg5I/',label:'See it on Instagram'},
    anim: 'animProtectKing'
  },
  {
    id:'w9', cat:'warmup', name:"Don't Drop the Egg", duration:7,
    setup:'Pairs. Each pair holds one ball between them — one palm each, no gripping. They move around a 20×20m grid trying to knock OTHER pairs\' balls (eggs) to the ground using their free hands, while keeping their own egg from dropping. If an egg drops, that pair does 5 jumping jacks before rejoining. Last pair with their egg wins.',
    points:['Hold with your palm flat — no gripping or cradling','Communicate with your partner — move together','Use your free hand to attack but keep balanced','Scan constantly — threat can come from any direction'],
    progression:'Restrict the grid size to increase pressure. Winning pair plays with one finger each.',
    cues:['Soft hands','Move together!','Head up','Attack AND protect'],
    diagram:'droppedegg', viewBox:'0 0 300 180',
    youtube:{url:'https://www.instagram.com/reel/DVtO9x3jHT3/',label:"Watch: Don't Drop the Egg (Instagram)"},
    instagram:{url:'https://www.instagram.com/reel/DVtO9x3jHT3/',label:'See it on Instagram'},
    anim: 'animDroppedEgg'
  },
  {
    id:'w10', cat:'warmup', name:'Frog Jump Race', duration:7,
    setup:'Each player has 2 cones. All start on a line. Place cone 1 on the line, then squat low and leap as far forward as possible, landing and placing cone 2 where you land. Sprint back, pick up cone 1, return to cone 2, then leap again placing cone 1 ahead. Repeat — leapfrogging your own cones — until you reach the finish line 30m away. First to finish wins.',
    points:['Explosive squat — arms back, then swing forward to add distance','Land balanced — place the cone before you step away','Sprint back at full pace — the race is won in the sprints','Keep cones upright — knocked over cone = restart that jump'],
    progression:'Race in pairs side by side. Add a ball to carry during the sprint phase.',
    cues:['Low and explode!','Full sprint back','Arms forward on jump','Stay balanced on landing'],
    diagram:'frogjump', viewBox:'0 0 300 180',
    youtube:{url:'https://www.instagram.com/reel/DXC_fs1tODT/',label:'Watch: Frog Jump Race (Instagram)'},
    instagram:{url:'https://www.instagram.com/reel/DXC_fs1tODT/',label:'See it on Instagram'},
    anim: 'animFrogJump'
  },
  {
    id:'w11', cat:'warmup', name:'King of the Ring', duration:8,
    setup:'All players inside a marked ring or grid, each with a ball. On "go", everyone dribbles freely around the ring — the aim is to protect your own ball while knocking others\' balls out of the ring using your feet. If your ball gets knocked out (or you dribble it out yourself), you\'re out and step outside to watch. Play continues until only one player — and their ball — remains inside. That player is King of the Ring.',
    points:['Keep the ball close — small touches, never let it run away from you','Use your body to shield the ball from challengers','Scan constantly — threats can come from any direction, not just in front','Attack other balls when you see an opening, but don\'t abandon your own'],
    progression:'Shrink the ring as players get knocked out to keep it competitive to the end. Winner starts as King next round — everyone else tries to knock the King out first.',
    cues:['Protect your ball!','Head up','Small touches','Shield with your body'],
    diagram:'kingofring', viewBox:'0 0 300 180',
    youtube:{url:'https://youtu.be/eqEmKnJQH_A',label:'King of the Ring drill'},
    anim: 'animKingOfRing'
  },
  {
    id:'w12', cat:'warmup', name:'Heads & Saves', duration:10,
    setup:'A goal with two teams lined up on either side. One player from Team A starts in goal. The first player from Team B stands at the edge of the box as the attacker. The next player in Team B\'s line throws the ball in for the attacker to head at goal — a goal scored wins Team B a point. After each attempt, roles rotate: the scorer (or attempted scorer) from Team B becomes the new goalkeeper for Team B\'s turn, the goalkeeper from Team A goes to the back of Team A\'s line, and the next player in Team A\'s line becomes the new attacker with a Team A teammate throwing them the ball. Continue until everyone has had a turn as both attacker and goalkeeper. Most points wins.',
    points:['Attacker: attack the ball, don\'t wait for it to arrive — meet it with power','Keeper: set your feet early, hands ready before the header arrives','Thrower: serve it at head height with a bit of pace — a weak throw is easy to save','Keep the rotation moving briskly so nobody stands around too long'],
    progression:'Change to volleys instead of headers. Add a second ball in play for a rebound scramble if the first shot is saved.',
    cues:['Attack the ball!','Set your feet','Good service','Keep it moving'],
    diagram:'headssaves', viewBox:'0 0 300 200',
    facebook:{url:'https://www.facebook.com/share/r/1GV1MXazdq/',label:'See it on Facebook'},
    anim: 'animHeadsSaves'
  },
  {
    id:'w13', cat:'warmup', name:'Changing Direction', duration:8,
    setup:'Two teams line up at separate starting cones. On "go", the first player sprints to a cone 20 yards ahead, sharply changes direction to a cone 5 yards back and 5 yards to the side, changes direction again back past the first turning cone, then sprints the final 10 yards to the finish. Can be run as a straight race between the two teams, or with the coach shouting "go" to send the next pair one at a time.',
    points:['Explode out of every change of direction — don\'t just jog through the turn','Get low and drop your hips on the cut for a sharper turn','Plant the outside foot firmly before changing direction','Eyes up, not down at your feet, throughout the run'],
    progression:'Add a ball to dribble through the whole course. Run it as a knockout race — losers do 5 press-ups.',
    cues:['Explode out of the turn!','Low hips on the cut','Plant and go','Eyes up'],
    diagram:'changedir', viewBox:'0 0 300 200',
    facebook:{url:'https://www.facebook.com/share/r/1Ba4LHxxL8/',label:'See it on Facebook'},
    anim: 'animChangeDir'
  },
  {
    id:'w14', cat:'warmup', name:'Team Cone Race', duration:7,
    setup:'Split the players into 2 even teams. Both teams line up behind the same start line and go 1 by 1. Set a pole 15 yards ahead of each team, with an even number of small cones spread out on the ground at the foot of each pole. On "go", the first player in each team, holding a cone, races to their pole and puts the cone onto it, picks up another cone from the ground, then races back and hands it to the next player in line. This continues until all the cones are on the pole and the last player is back over the start line. First team back wins.',
    points:['Full sprint both ways - the race is won on the way back','Slow down just enough to drop the cone on cleanly - a missed cone costs more time','Next in line: hand out, ready to take the cone and go','Cheer your team on - everyone stays on the line until it is their go'],
    progression:'Add a ball to dribble out and back. Spread the ground cones wider so players have to search and turn to pick one up.',
    cues:['Sprint!','Cone on, grab one, go','Hand ready','First team back wins'],
    diagram:'teamconerace', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DEFn6ECoPOm/',label:'See it on Instagram'},
    anim: 'animTeamConeRace', animMs: 12000
  },
  {
    id:'w15', cat:'warmup', name:'Cone Collect Race', duration:7,
    setup:'1v1 race. Lay out 2 straight lines of 8 to 10 small cones side by side, about 2 yards apart, with the cones about 1 yard apart running away from the start. Use a different colour for each player\'s line. Put a ball at the start of each line (used in the progression). Two teammates kneel at the start holding a ball net (or a bib on the ground) open between them. On "go", both players sprint out, pick up one of their own cones, run back and drop it in the net, then go again. Cones can be collected in any order. First player to get all their cones in the net wins. Run it in pairs: the next pair lays the cones back out and swaps with the net holders.',
    points:['One cone at a time - sprint out, sprint back','Get low to scoop the cone up, don\'t stop and bend from standing','Think about your order - near cones first gets points on the board, far cones first saves the short runs for when you are tired','Drop it IN the net - a cone on the floor does not count'],
    progression:'Once all your cones are in the net, you are not finished yet: chip your ball from the start into the net to win. If it misses, fetch it and go again. Move the ball further back to make the chip harder.',
    cues:['Go go go!','One at a time','Low to pick up','In the net!'],
    diagram:'conecollect', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DGny0ORtDIV/',label:'See it on Instagram'},
    anim: 'animConeCollect', animMs: 14000
  },
  {
    id:'w16', cat:'warmup', name:'Team Shooting Race', duration:8,
    setup:'Two teams, two lanes side by side about 10 yards apart (blue on the left, red on the right). In each lane lay a zig-zag of 5 or 6 cones running away from the start line, alternating left and right about 3 yards apart. At the top of the zig-zag put a cone with one ball per player beside it, and a small goal about 8 yards beyond that. Each team lines up behind its start cone. On "go", the first player weaves through the cones, picks up a ball at the ball cone, takes a touch and shoots at their small goal. As soon as they shoot, the next player in line sets off. After shooting, jog back down the outside of the lane to the back of your line. Scoring: 2 points for every goal, and 2 points to the team whose last player shoots first. Most points wins.',
    points:['Weave tight round the cones - quick small steps, low hips on each turn','Slow down just enough at the ball cone to get the ball under control','One touch out of your feet, then shoot - do not dribble all the way to the goal','Hit the target - a goal is worth as much as winning the race','Jog back on the outside so you do not block the next runner'],
    progression:'Dribble a ball through the zig-zag instead of running, then shoot. Shoot with the weaker foot only. Move the goal further back, or put a keeper in each goal.',
    cues:['Go go go!','Tight round the cones','Touch and shoot','Hit the target'],
    diagram:'teamshootingrace', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DGh9Q6HN8pH/',label:'See it on Instagram'},
    anim: 'animTeamShootingRace', animMs: 16000
  },
    // ── EXTRA DEFENDING ──
  {
    id:'d6', cat:'defending', name:'Covering Pairs', duration:12,
    setup:'2 defenders vs 2 attackers in a 20×15m area with a small goal. One defender presses the ball, second defender drops to cover the space behind. Attackers try to use a through ball or quick switch to beat them.',
    points:['First defender: press the ball — limit time on it','Second defender: drop off, angle body to see ball AND second attacker','Swap roles when ball switches — communicate who presses'],
    progression:'Add a wide attacker so defenders must also cover width.',
    cues:['Press and cover','Drop and angle','Who has ball?'],
    diagram:'game', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=Bo3mEAN0OZM',label:'Defending pairs cover & press'},
    anim: 'animCoveringPairs'
  },
  {
    id:'d7', cat:'defending', name:'Zonal 3v3 — Split Pitch', duration:14,
    setup:'Split the pitch into 3 equal vertical zones, with a small goal at each end of every zone (6 goals total — 3 at each end). Two teams of 3. Each player is locked to their own zone — one player from each team per zone (3 separate 1v1 zones side by side). Teams pass between zones to build attacks and can score in ANY of the 3 goals at the end they are attacking. Players cannot leave their zone to help a teammate.',
    points:['You are on your own in your zone — win your individual battle','Scan for which of your 3 goals is most open before you receive','Communicate with teammates in the other zones to shift the point of attack','Defending: stay compact to your goals, don\'t get turned easily'],
    progression:'Allow one "free" player who can move between zones to overload. Reduce to 2 zones for more crowded 1v1s.',
    cues:['Win your zone!','Which goal is open?','Switch the ball','Stay compact'],
    diagram:'zonal3v3', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=Hh-P-BF0VAM&t=210',label:'Zonal 3v3 (2nd drill in video, from 3:30)'},
    anim: 'animZonal3v3'
  },
    // ── EXTRA ATTACKING ──
  {
    id:'a5', cat:'attacking', name:'Wall Pass Street Soccer', duration:12,
    setup:'4 players in a 10×10m box. No goalkeeper. Players can use the walls/cones as 1-touch rebound walls (like a wall pass). First to score 5 wins. Unlimited touches but must wall-pass before shooting.',
    points:['Play at speed — use the wall to beat the defender','Move after playing the wall — don\u2019t stand still','Vary the angle of your wall pass'],
    progression:'One touch only. Add a "golden wall" cone worth double points.',
    cues:['Play and move!','Angle the pass','First touch forward'],
    diagram:'onetwo', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=bev-srStVsQ',label:'Wall pass combination play'},
    anim: 'animWallPass'
  },
  {
    id:'a6', cat:'attacking', name:'4-Goal Game', duration:15,
    setup:'30×25m area. 4 small goals, one on each side. Two teams of 4. Players can score on ANY of the 4 goals. Forces teams to switch play quickly and exploit space.',
    points:['Switch the ball quickly — find the open goal','Scan before receiving — know which goals are unguarded','Forwards must press to block goals as well as attack'],
    progression:'Condition: must complete 3 passes before scoring.',
    cues:['Switch play!','Head up','Quick ball'],
    diagram:'gates', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=vzWLn5WlAGY',label:'4-Goal Game'},
    anim: 'animFourGoal'
  },
  {
    id:'a7', cat:'attacking', name:'Crossing & Finishing', duration:15,
    setup:'Server on each wing. Players take turns receiving a cross from the left or right. Must score with one touch if possible. Cross delivery varies: driven, floated, low and hard.',
    points:['Attack the near post run first to drag defenders','Back-post runner arrives late with pace','Shoot across the keeper — far corner'],
    progression:'Add a passive then active defender. Server chips instead of driving.',
    cues:['Attack the ball!','Far corner','Arrive with pace'],
    diagram:'finishing', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=mFhfexVwcvI',label:'Crossing & finishing drill'},
    anim: 'animCrossing'
  },
  {
    id:'a8', cat:'attacking', name:'Shooting Drill — Combination Finish', duration:14,
    setup:'3 players (A, B, C) with a goal and keeper. A stands furthest out, B to A\'s left, C to A\'s right — B has a mannequin or cone marker just ahead of them. A passes to B. B lays the ball off first-time to C, then immediately spins away from their own marker and runs out to the left into open space. C plays the ball first-time into that space for B, who shoots from the left side. Players rotate anti-clockwise after each rep — A becomes B, B becomes C, C becomes A.',
    points:['B: spin off your own marker the INSTANT the pass to C is released — don\'t wait to see if it arrives','B: run out wide to the left — you need real separation before the ball arrives','C: first-time pass if possible — the space closes fast','A: weight the first pass so B can lay it off in one touch','B: attack the shot from the left — get your body shape right before striking'],
    progression:'Add a passive defender on the shooter. Keeper must set before each attempt — no cheating early.',
    cues:['Spin now!','First time if you can','Attack the space','Weight the pass'],
    diagram:'shootcombo', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DVAeFg3EqB1/',label:'See it on Instagram'},
    anim: 'animShootCombo'
  },
  {
    id:'a9', cat:'attacking', name:'Overlapping Runs & Finishing', duration:13,
    setup:'3 cones set 10 yards apart in a straight line leading to a goal, with the 3rd cone 10 yards from goal. Pairs (A and B) share one ball and start together to the left of cone 1. A dribbles toward cone 1 and, just before reaching it, lays the ball off left to B. A then runs right, around cone 1, and loops back behind B. B dribbles on toward cone 2 and repeats the same lay-off and overlap. This continues through cone 3, where the receiving player takes the final pass and shoots on goal.',
    points:['Lay the ball off with the inside of the foot, weighted so the next player doesn\'t have to break stride','Time the overlapping run to arrive just as the ball is played — not too early, not late','Receiving player: take a positive first touch forward, don\'t stop and wait','Keep the pattern moving at pace — this is about rhythm as much as technique'],
    progression:'Add a passive defender jogging alongside to add read-and-react pressure. Alternate which player finishes so both practice the shot.',
    cues:['Lay it off early','Time your overlap','Positive first touch','Keep the rhythm'],
    diagram:'overlapfinish', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DXsl5OBDsMc/',label:'See it on Instagram'},
    anim: 'animOverlapFinish'
  },
  {
    id:'a10', cat:'attacking', name:'2v1 Attacking Decisions', duration:12,
    setup:'Set up 3 cones facing a goal: Cone A is 30 yards from the centre of the goal, Cone B is on the left edge of the "D", Cone C is on the right edge of the "D". One attacker starts on Cone A, one attacker on Cone C, and one defender on Cone B. The attacker on A passes to the attacker on C to start the phase — the moment that pass is played, the defender on B becomes active. The two attackers combine to try to score against the single defender.',
    points:['Attacker on A: weight the starting pass so C can attack goal on the front foot','Attacker on C: assess the defender\'s position immediately — run at them or combine?','Defender: react the instant the ball leaves A — don\'t anticipate early and cheat the start','Attackers: use the extra man — draw the defender then find the free player'],
    progression:'Add a second defender starting deeper to recover and make it 2v2. Restrict attackers to 1-touch finishes only.',
    cues:['React on the pass!','Draw and release','Use the extra man','Attack on the front foot'],
    diagram:'twovonedecision', viewBox:'0 0 300 200',
    facebook:{url:'https://www.facebook.com/share/r/1Db9gDSAZB/',label:'See it on Facebook'},
    anim: 'animTwoVOneDecision'
  },
  {
    id:'a11', cat:'attacking', name:'Fun Team Shooting Drill', duration:12,
    setup:'Lay out cones in a big semicircle: start on the goal line outside the box on one side, curve round behind the D, and finish on the goal line outside the box on the other side. Keeper in goal. Split the players into two teams, one lined up on the goal line just outside the end cone on each side. Pair each player with one on the other team and give the pair a number. The coach stands by the right-hand post and calls a number: those two players race out and round the outside of the cones to the edge of the D. As they come round, the coach rolls a ball in centrally towards the edge of the box. The first player to it takes a touch and shoots past the keeper. Winner scores a point for their team.',
    points:['Go on the call: listen for your number, don\'t guess','Run round the OUTSIDE of every cone, no cutting corners','Slow down a little as you arrive so you can take a clean first touch','First touch out of your feet, setting up the shot','Pick a corner and hit the target, low and hard beats high and wild'],
    progression:'The player who loses the race becomes a defender, making it 1v1 to goal. Coach varies the roll (firmer, bouncing, off-centre). Call two numbers at once for 2v2.',
    cues:['Listen for your number!','Round the outside','Touch and shoot','Hit the target'],
    diagram:'teamshootrace', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DKl-lQMtlYN/',label:'See it on Instagram'},
    anim: 'animTeamShootRace', animMs: 7000
  },
  {
    id:'a12', cat:'attacking', name:'1v1 Shooting', duration:12,
    setup:'Keeper in goal. Coach stands around halfway with a pile of balls and a cone just in front. Split the players into two lines, one on each side of the coach (blue on the left, red on the right), both facing the goal. The coach plays a ball through past the cone towards goal and the first player from each line races for it. Whoever gets it first is the attacker and tries to score; the other player defends. If the defender wins the ball they become the attacker and the other player defends. You win if you score. The turn ends when a goal is scored, the keeper gets the ball, or the ball goes dead. Both players then join the back of the other line and the next two go.',
    points:['Go as soon as the coach plays it, first to the ball wins','Attacker: take your touch away from the defender and get your shot off early','Defender: get goal-side first, then try to win it','Win it back? You are the attacker now, go for goal straight away','Hit the target, low shots are hardest for the keeper'],
    progression:'Coach varies the feed: firmer, wider, or in the air. Add a small target for the defender to score in if they win it, or make it 2v2 with two from each line.',
    cues:['Race for it!','Touch and shoot','Goal-side','Win it, attack!'],
    diagram:'1v1shooting', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DADUafLO5Ls/',label:'See it on Instagram'},
    anim: 'anim1v1Shooting', animMs: 6000
  },
  {
    id:'a13', cat:'attacking', name:'Penetrating Passes', duration:12,
    setup:'Mark out a grid about 15m wide and 20m long with a small goal at the top end. Split it into three equal zones across the grid with cones or dashed lines. One attacker starts in the bottom zone with the ball, one defender (X) stands in the middle zone, and a second attacker waits in the top zone. Put a red cone just below the grid with the next player queued behind it. The coach stands on the left side of the grid. Everyone stays in their own zone. The two attackers move side to side to open a passing lane past X, then the bottom player plays a pass through the middle zone to the top player, who controls it and shoots at the small goal. If X intercepts, X can score by dribbling out over the bottom line of the grid. Rotate: the shooter collects the ball and joins the queue, the passer moves up to the top zone, and the next player steps in to the bottom zone with a new ball. Swap the defender every few goes.',
    points:['Stay in your own zone: the defender cannot leave the middle','Attackers: keep moving side to side until there is a clear lane past X','Passer: look up before you pass, if X is in the way move the ball first','Play the pass along the ground and firm enough to get past X','Receiver: open up to see the ball and the goal, first touch towards goal then shoot','Defender: watch the passer\'s hips and step across to cut out the pass'],
    progression:'Limit the passer to 3 touches. Let the top player drop into the middle zone to make it 2v1. Add a second defender in the middle zone, or give the defender a point for every interception.',
    cues:['Find the lane!','Look up, pass through','Open up, shoot','Defender: read it, win it'],
    diagram:'penetratingpasses', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DL9-jAtMSOb/',label:'See it on Instagram'},
    anim: 'animPenetratingPasses', animMs: 7000
  },
    // ── EXTRA MOVEMENT ──
  {
    id:'m4', cat:'movement', name:'Directional First Touch', duration:10,
    setup:'Player in the middle of a 10×10m square with a feeder on each side. Feeder passes in, player takes a first touch diagonally out of their feet and passes to a different feeder. 45 seconds each then rotate.',
    points:['Open body shape BEFORE the ball arrives','First touch must go sideways or forward — never back into pressure','Make eye contact with target feeder before touching the ball'],
    progression:'Feeder follows their pass as a passive defender. Player must shield.',
    cues:['Open up early','Touch away from pressure','See the picture first'],
    diagram:'receiving', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=q2hBd6O6Zss',label:'Directional first touch drill'},
    anim: 'animDirectionalTouch'
  },
  {
    id:'m5', cat:'movement', name:'Overlapping Runs', duration:12,
    setup:'Groups of 3 on a half-pitch. Player A has ball on the wing. B is ahead inside. A passes to B and immediately overlaps outside. B holds until A is level, then plays into the space for A to cross or shoot.',
    points:['Overlapping player: time the run — go when the pass is made','Ball holder: hold until the run is made — don\u2019t play too early','Overlapping run must be at pace — no jogging'],
    progression:'Add a defender to track the overlap. Work both sides.',
    cues:['Go on the pass!','Hold... now!','Run at pace'],
    diagram:'thirdman', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=9J8EyEvoZ4Y',label:'Overlapping runs drill'},
    anim: 'animOverlapRuns'
  },
  {
    id:'m6', cat:'movement', name:'1v1 Gate Dodge', duration:8,
    setup:'No ball. Set out a 2-cone start gate for the attacker. 15 yards ahead, put a central gate where the defender starts, with two more gates on the same line 10 yards to its left and right. The attacker jumps to start, then runs at the defender and tries to get through either side gate without being tagged. The trick is to sell a move one way so the defender commits to that side, then cut and run through the gate on the other side. The defender leaves the central gate as soon as the attacker jumps and tries to tag them before they get through. 3 goes each, then swap roles.',
    points:['Attacker: run at the defender, then sell the fake with a big step and your shoulders','Attacker: once the defender leans, plant and explode the other way','Defender: stay patient and on your toes, do not jump at the first fake','Defender: stay between the two gates until you see where they really go'],
    progression:'Add a ball so the attacker has to dribble through the gate. Or make the side gates narrower, or move them closer together.',
    cues:['Sell the fake!','Plant and go','Patient feet','Make them commit'],
    diagram:'gatedodge', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DHXAkGAyw3H/',label:'See it on Instagram'},
    anim: 'animGateDodge', animMs: 5000
  },
  {
    id:'m7', cat:'movement', name:'Pass and Move Patterns', duration:12,
    setup:'Use the top of the pitch with a goal and keeper. Put a tall orange cone just outside the left corner of the box and a tall yellow cone just inside the right edge of the box. About 15m out, put a pink disc cone on the left and another on the right (on the halfway line on a small pitch), and a green disc cone at the bottom in the middle with the balls. One player on each pink cone, the rest queue at the green cone. A (green) passes to B (left pink) and follows the pass to B\'s cone. B passes across to C (right pink), then sprints up to the orange cone. C plays the ball forward into B\'s run, then runs round the outside of the yellow cone towards goal. B dribbles round the orange cone and passes across the box for C to shoot. Everyone moves on one place: A takes B\'s cone, B goes to C\'s cone, C fetches the ball and joins the queue at the green cone.',
    points:['Pass and follow: as soon as the ball leaves your foot, go','Pass along the ground to the receiver\'s front foot','B: sprint as soon as you pass across, do not watch the ball','C: pass into the space in front of B, not to their feet','C: bend your run round the yellow cone so you arrive facing the goal','Finisher: arrive on time, side-foot it low into the corner'],
    progression:'Two-touch, then one-touch passing. Swap the run so C goes to the orange cone and B to the yellow one, or let B choose to shoot or pass. Add a second ball so the next group starts as soon as the shot is taken.',
    cues:['Pass and move!','Follow your pass','Into the space','Round the cone, attack the goal'],
    diagram:'passmove', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/DPdqVCLD0zi/',label:'See it on Instagram'},
    anim: 'animPassMove', animMs: 8000
  },
    // ── EXTRA SKILLS ──
  {
    id:'s4', cat:'skills', name:'Turning Drill — 4 Turns', duration:10,
    setup:'One ball per player. Dribble to a cone, perform a turn, dribble back. Cycle through 4 turns: inside hook, outside hook, Cruyff, drag-back. Coach calls the turn name before they reach the cone.',
    points:['Approach the cone at pace — don\u2019t slow too early','Exaggerate the body feint before the turn','Accelerate away after the turn — it\u2019s wasted if you\u2019re slow'],
    progression:'Two cones 8m apart — perform a different turn at each. Race.',
    cues:['Feint first!','Quick exit','Sell it!'],
    diagram:'coervers', viewBox:'0 0 300 160',
    youtube:{url:'https://www.youtube.com/watch?v=IeMYh7roBjk',label:'Turning drill — 4 turns'},
    anim: 'animTurning'
  },
  {
    id:'s5', cat:'skills', name:'Ball Mastery Circuit', duration:10,
    setup:'Each player has a ball. Run through 8 moves for 30 seconds each: toe-taps, inside-outside, sole rolls, scissors, step-overs, pull-push, Maradona, and figure-of-8 around feet.',
    points:['Stay on your toes throughout — never flat-footed','Small quick touches — keep the ball under your body','As speed builds, add a tiny body shift to each move'],
    progression:'Perform each move while dribbling forward. Add a cone gate to dribble through at the end.',
    cues:['On your toes','Soft feet','Speed up!'],
    diagram:'coervers', viewBox:'0 0 300 160',
    youtube:{url:'https://www.youtube.com/watch?v=nab4UqS_2iM',label:'50 ball mastery drills — U9 to U12'},
    anim: 'animBallMastery'
  },
  {
    id:'s6', cat:'skills', name:'Shooting Technique', duration:10,
    setup:'Set up one station per pair, about 8-10 yards out from a goal. Put a ball on a yellow flat marker so it sits up like a tee. Put a red marker right next to the ball on its left, then a second red marker a short step further left, leaving a gap about one foot wide between the two reds. The player stands behind the ball. Plant the left (standing) foot in the gap between the red markers, level with the ball, then swing the right leg through to strike the ball while keeping the left foot fixed in place. Practise the swing slowly a few times first, then kick the ball at goal. Partner fetches the ball and resets it on the yellow marker, then swap. Left-footers mirror it with the red markers on the right of the ball.',
    points:['Standing foot goes in the gap between the reds, level with the ball and toe pointing at the goal','Keep the standing foot fixed until the ball has gone, no hopping or sliding','Eyes on the ball and head over it as you strike','Lock the ankle, toe down, strike through the middle of the ball with the laces','Follow through towards the target'],
    progression:'Add a two or three step run-up into the plant. Take the red markers away once the plant foot lands in the right place every time. Then shoot off the ground or a rolling pass, and aim for the corners or add a keeper.',
    cues:['Plant between the reds','Left foot stays','Laces, toe down','Follow through'],
    diagram:'shootingtechnique', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/C9LpTEQSFSz/',label:'See it on Instagram'},
    anim: 'animShootingTechnique', animMs: 5000
  },
    // ── EXTRA SET PIECES ──
  {
    id:'sp4', cat:'setpiece', name:'Penalty Pressure Shootout', duration:10,
    setup:'All players take a penalty under pressure conditions: coach counts down from 5, one teammate shouts their name, another tries to distract. Goalkeeper must dive. Track scores. Sudden-death format for last 4.',
    points:['Decide your spot before you start your run — don\u2019t change your mind','Short run-up for control','Strike through the middle of the ball — don\u2019t scoop'],
    progression:'Winner of each round becomes goalkeeper for the next.',
    cues:['Pick your spot','Commit!','Head down'],
    diagram:'finishing', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=y-X_t1KVO7o',label:'Finishing & shooting under pressure'},
    anim: 'animPenalty'
  },
  {
    id:'sp5', cat:'setpiece', name:'Goal Kick Build-Up', duration:10,
    setup:'GK takes goal kick. 3 outfield players position to receive — one short left, one short right, one deeper central. Defending team of 2 press immediately. Aim to play out from the back through 5 passes before crossing halfway.',
    points:['Receivers: check away then check back to show','Don\u2019t stand still waiting — create the angle','GK: go short if pressed — go long only as a last resort'],
    progression:'Add a third pressing defender. GK must distribute in under 4 seconds.',
    cues:['Check and show','Create the angle','Support the GK'],
    diagram:'pressing', viewBox:'0 0 300 180',
    youtube:{url:'https://www.youtube.com/watch?v=vzWLn5WlAGY',label:'Goal kick build-up play'},
    anim: 'animGoalKick'
  },
    // ── SET PIECES ──
  {
    id:'sp1', cat:'setpiece', name:'Corner Kick Runs', duration:15,
    setup:'Full or 3/4 pitch. Corner taker + 5 outfield players. Assign run types: near-post flick, back-post arriving late, edge of box for clearance, near-post decoy. Walk through then at pace.',
    points:['Near-post runner: time run to get there as ball arrives','Back-post runner: start late — arrive with pace','Decoy: draw a defender, peel away last second','Shooter: stay at edge of box for second ball'],
    progression:'Add 3 defenders. Corner taker varies delivery (inswing/outswing).',
    cues:['Time the run!','Arrive with pace','Attack the ball','Back-post late!'],
    diagram:'corner', viewBox:'0 0 300 200',
    youtube:{url:'https://www.youtube.com/watch?v=KcJEITSMxLY',label:'Corner kick runs & delivery'},
    anim: 'animCorner'
  },
  {
    id:'sp2', cat:'setpiece', name:'Free Kick Wall & Run', duration:12,
    setup:'3v free kick 20m from goal. One player strikes over/around wall. Two runners time overlapping runs. GK in goal. Alternate strike + run combinations.',
    points:['Wall: jump on command, hold shape','Shooter: decide early — strike or dummy for runner','Runners: stagger starts — create different angles'],
    progression:'Add passive defenders behind wall. Add offside trap.',
    cues:['Jump on command','Pick your spot','Disguise intent'],
    diagram:'freekick', viewBox:'0 0 300 200',
    youtube:{url:'https://www.youtube.com/watch?v=5lYvdlhTWrA',label:'Free kick wall & runners'},
    anim: 'animFreeKick'
  },
  {
    id:'sp3', cat:'setpiece', name:'Throw-In Quick Play', duration:8,
    setup:'Pairs along a touchline. Player A takes throw-in to Player B who has their back to play. B must control, turn, and play through a gate 5m away before a passive defender closes down.',
    points:["Move to create the angle before the throw","Receive with back foot — protect with body","Turn quickly — look up before touching the ball","Move the ball immediately — don't hold"],
    progression:'Make defender active. Add a second option for the thrower.',
    cues:['Check away first','Protect with body','Quick turn','Play forward!'],
    diagram:'throwin', viewBox:'0 0 300 160',
    youtube:{url:'https://www.youtube.com/watch?v=EDJKPs2Qcag',label:'Throw-in quick play drill'},
    anim: 'animThrowIn'
  },
  // ── TRAINING MATCH ──
  {
    id:'tm1', cat:'match', name:'Training Match — Free Play', duration:15,
    setup:'Small-sided game (4v4 or 5v5 works well) with 2 goals, on a pitch roughly 30x20m. No touch, pass, or step restrictions — play exactly as they would in a real match. Use this as a baseline to see how the team applies everything they\'ve worked on in the session without any artificial constraints.',
    points:['Let the game flow — only stop for genuine coaching moments, not every small error','Look for the specific skills/patterns from earlier in the session showing up naturally','Encourage communication and movement off the ball','Praise decision-making, not just outcomes'],
    progression:'Add small conditions on the fly if you spot something worth reinforcing (e.g. "next 5 minutes, must switch play at least once per attack").',
    cues:['Play what you see','Talk to each other!','Move after you pass','Enjoy it!'],
    diagram:'matchfree', viewBox:'0 0 300 180',
    anim: 'animMatchFree'
  },
  {
    id:'tm2', cat:'match', name:'Training Match — Minimum Passes', duration:15,
    setup:'Small-sided game (4v4 or 5v5), 2 goals, roughly 30x20m. A team must complete a minimum number of passes (start with 3-4) before they\'re allowed to shoot. If they shoot too early, no goal counts even if the ball goes in. Encourages patience and combination play over hopeful long shots.',
    points:['Count passes out loud as a team so everyone knows where they are','Move to support the ball — you can\'t hit the pass count standing still','Use width — passing sideways still counts and helps you reach the total','Don\'t force a bad pass just to hit the number — control still matters'],
    progression:'Increase the minimum pass count as the team gets comfortable. Reduce it again if it\'s killing the game\'s pace.',
    cues:['Count together!','Support the ball','Use the width','Quality over speed'],
    diagram:'matchpasses', viewBox:'0 0 300 180',
    anim: 'animMatchPasses'
  },
  {
    id:'tm3', cat:'match', name:'Training Match — Max Touches', duration:15,
    setup:'Small-sided game (4v4 or 5v5), 2 goals, roughly 30x20m. Each player is limited to a maximum number of touches on the ball (start with 2-3) before they must pass or shoot. Extra touches beyond the limit turn possession over to the other team. Forces quick decision-making and off-the-ball movement.',
    points:['Scan BEFORE the ball arrives — you won\'t have time to look around after','Move immediately after passing — you\'ll be needed again soon','First touch must set up your next action, not just control the ball','Communicate early so a teammate knows to expect the ball'],
    progression:'Drop to 1-touch only for a spell to really sharpen decision speed, then relax back up.',
    cues:['Look before it arrives!','One-two touch max','Move after you pass','Quick decisions'],
    diagram:'matchtouches', viewBox:'0 0 300 180',
    anim: 'animMatchTouches'
  },
  {
    id:'tm4', cat:'match', name:'Training Match — Max Steps', duration:15,
    setup:'Small-sided game (4v4 or 5v5), 2 goals, roughly 30x20m. Each player is limited to a maximum number of steps while in possession (start with 3-4) before they must pass or shoot. Counting steps rather than touches specifically discourages dribbling and rewards quick combination play and movement off the ball.',
    points:['Plan your pass before you even receive the ball','Take purposeful steps — don\'t waste them on unnecessary touches','Teammates must offer support quickly since the ball can\'t be held','Great for encouraging one-touch combinations near goal'],
    progression:'Allow unlimited steps once a player has beaten a defender 1v1, to still reward good dribbling in the right moment.',
    cues:['Plan ahead!','Purposeful steps','Offer support fast','Quick combinations'],
    diagram:'matchsteps', viewBox:'0 0 300 180',
    anim: 'animMatchSteps'
  },
  // ── GOALKEEPER ──
  {
    id:'gk1', cat:'goalkeeper', name:'Rebound Wall Reaction Saves', duration:10,
    setup:'Goalkeeper faces a rebound wall. Coach stands behind the keeper and kicks the ball against the wall from either side of the keeper, sending it back at an angle to the keeper\'s left or right. The keeper must react to the rebound and get down to save it.',
    points:['Stay on the balls of your feet in a ready position — don\'t be flat-footed','React to the rebound, not the coach\'s kick — watch the wall, not the foot','Get your body behind the ball where possible, hands strong in front','Get down early on low balls — don\'t stab at the last second'],
    progression:'Coach varies the power and angle of the kick to change the speed and height of the rebound. Add a second ball for a rapid double save.',
    cues:['Ready position!','React to the wall','Get down early','Hands strong'],
    diagram:'gkrebound', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DZhc1MAN4MH/',label:'See it on Instagram'},
    anim: 'animGKRebound'
  },
  {
    id:'gk2', cat:'goalkeeper', name:'Two Goals Reaction Save', duration:10,
    setup:'Two small goals set up on the same line, roughly 8 yards apart, both facing the same direction (south). The keeper stands on that same line, midway between the two goals, also facing south. The coach stands behind the keeper with a supply of balls and strikes toward one of the two goals. The keeper must turn 180 degrees and dive left or right, depending which way the ball is travelling, to make the save.',
    points:['Stay central and balanced, weight on the balls of your feet, ready to turn either way','React to the coach\'s strike, don\'t guess early','Turn quickly through 180 degrees — don\'t waste time facing the wrong way','Get the whole body across and behind the ball, not just an arm'],
    progression:'Coach delays the shot randomly to test patience and concentration. Move the goals further apart to test explosive power over a longer distance.',
    cues:['Stay central!','React, don\'t guess','Turn fast','Whole body across'],
    diagram:'gktwogoals', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DbEn-u1xlXX/',label:'See it on Instagram'},
    anim: 'animGKTwoGoals'
  },
  {
    id:'gk3', cat:'goalkeeper', name:'Cone Recovery Save', duration:10,
    setup:'Set 2 cones 1 yard out from the goal line, 2 yards apart, running parallel to the goal line, centred in front of the goal. Starting central, the keeper moves out to the outside of one cone. The instant the keeper reaches the outside of that cone, the coach shoots for the OPPOSITE side of the goal — the keeper must react immediately and dive quickly across to make the save. Repeat several times working one cone, then switch to work the other side.',
    points:['Quick feet out to the cone — this is a short, sharp movement, not a jog','React the instant the shot is struck — don\'t anticipate and drift early','Explode across goal — the distance is short but the time to cover it is shorter','Get your whole body behind the ball on the recovery save, not just a hand'],
    progression:'Coach varies the timing of the strike to test reaction speed. Move the cones slightly further apart to increase the distance of the recovery dive.',
    cues:['Quick feet out!','React, don\'t guess','Explode across','Whole body behind it'],
    diagram:'gkconeweave', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DbwvPtMKcRO/',label:'See it on Instagram'},
    anim: 'animGKConeWeave'
  },
  {
    id:'gk4', cat:'goalkeeper', name:'Cone Touch & Cross Dive', duration:10,
    setup:'Set 1 cone 1 yard out from goal, positioned toward the left or right post. On "go", the keeper moves toward the cone, reaches down and touches it, then the coach shoots for the OPPOSITE side — the keeper must dive back across goal to save it. For example: cone toward the left post, keeper touches it, coach shoots right, keeper dives right. Switch the cone to the opposite post and repeat, diving the other way.',
    points:['Get down and touch the cone properly — don\'t just wave a hand near it','Push off explosively back across goal the instant the ball is struck','Cover the full distance — this is a genuine full-length dive, not a step','Get set again quickly, ready to go again on the next cone'],
    progression:'Coach varies the timing of the shot after the touch to sharpen reaction speed. Add a second cone so the keeper doesn\'t know which post until the coach points.',
    cues:['Get down, touch it!','Push off explosively','Full dive across','React to the strike'],
    diagram:'gkposttouch', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/Dbql0c8MEo3/',label:'See it on Instagram'},
    anim: 'animGKPostTouch'
  },
  {
    id:'gk5', cat:'goalkeeper', name:'Diagonal Cone Progression Save', duration:12,
    setup:'Set 5 cones in a diagonal line coming out from the right goalpost. Cone 1 sits 1 yard out from the goal line and 1 yard in from the post; each following cone is a further 1 yard out and 1 yard in from the one before, so the line runs diagonally away from the post toward the middle of the goal. Starting behind cone 1, the keeper moves out behind it and back through the gap between cone 1 and cone 2. The coach, positioned on the right side of goal, then shoots on target — the keeper must recover quickly back into the goal to make the save. Repeat the movement from each cone along the diagonal in turn.',
    points:['Quick, controlled footwork through each gap — don\'t rush and lose balance','Sprint back into goal the instant the ball is struck — don\'t admire the weave','Get your body set and behind the shot even after a hard recovery run','Reset your position at each new cone before moving to the next'],
    progression:'Coach varies the power and timing of the shot at each cone. Mirror the whole set-up on the left post working to the right for the keeper\'s other side.',
    cues:['Quick feet!','Sprint back to goal!','Get set on arrival','Reset each time'],
    diagram:'gkdiagonalcones', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/Dcb1ONHMueo/',label:'See it on Instagram'},
    anim: 'animGKDiagonalCones', animMs: 6000
  },
  {
    id:'gk6', cat:'goalkeeper', name:'Knee Block Progression', duration:10,
    setup:'Keeper starts on their knees facing the coach, 2 yards away. The coach has 5 balls lined up 1 yard apart, each getting progressively further from the keeper. Starting with the ball nearest the keeper, the coach kicks it and the keeper must dive sideways from their knees to block it. The coach then moves to each subsequent ball in turn — the keeper stays down on their knees throughout and must shuffle across quickly to block each one.',
    points:['Stay down on your knees the whole way through — don\'t stand up between balls','Get your hands and body behind the ball, not just an arm out','Shuffle across quickly and low — don\'t rise up as you move','Reset your balance for a split second before the next ball is struck'],
    progression:'Coach varies the pace between kicks to test the keeper\'s recovery speed. Reverse the order, working from the furthest ball back in to the nearest.',
    cues:['Stay down!','Body behind it','Shuffle low and fast','Reset quickly'],
    diagram:'gkkneeblock', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DaIqq8roPbg/',label:'See it on Instagram'},
    anim: 'animGKKneeBlock', animMs: 7000
  },
  {
    id:'gk7', cat:'goalkeeper', name:'Race & Shoot', duration:12,
    setup:'Set up 2 small goals 5 yards apart, facing each other. The keeper starts behind Goal A with a ball placed to their right. A player (attacker) starts behind Goal B. On "go", both the keeper and the attacker sprint around the opposite goal from where they started. The attacker\'s job is to get to the ball that was left beside Goal A and shoot it toward Goal B, while the keeper must recover around Goal B and get set in time to save it.',
    points:['Sprint the full way around the far goal — don\'t cut the corner short','Keeper: find the fastest line back into goal, don\'t just retrace your steps','Attacker: assess your run — arrive under control enough to strike cleanly','Keeper: get your body shape set even if you\'re still arriving as the shot is struck'],
    progression:'Add a second ball so the attacker has a choice of near or far post. Time the race — attacker only gets the shot if they beat the keeper back.',
    cues:['Sprint the full way round!','Fastest line back','Get set on arrival','Full effort both ways'],
    diagram:'gkraceshoot', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/p/CIGnbAbgGGU/',label:'See it on Instagram'},
    anim: 'animGKRaceShoot'
  },
  {
    id:'gk8', cat:'goalkeeper', name:'Four Cone Low Save Progression', duration:12,
    setup:'Mark a pitch line (e.g. the edge of the box). Set 4 cones in a line, 3 yards away from and parallel to that pitch line, spaced 3 yards apart. Place a ball on the pitch line level with cone 2, another level with cone 3, another level with cone 4, and a 4th ball a further 5 yards past cone 4 — all balls are laid out in place before the drill starts. The keeper starts on the pitch line, 3 yards back from cone 1. On "go", the keeper runs out and around cone 1, then goes straight across along the pitch line to the ball level with cone 2 — the coach strikes that ball low the instant the keeper gets there, and the keeper must get down quickly to save it. The keeper then progresses on to loop around each subsequent cone in turn, going straight across the line each time to save the next ball along.',
    points:['Sprint out to and around each cone — don\'t jog the movement','Get down early and quickly on the low ball — don\'t stab late','Keep your footwork controlled around each cone, not just fast','Reset instantly after each save, ready to drive to the next cone'],
    progression:'Coach varies the timing of each strike to sharpen reaction speed. Reverse the direction, working cone 4 back to cone 1.',
    cues:['Sprint and round!','Down early','Controlled feet','Reset fast'],
    diagram:'gkfourconeprog', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DafJIW4Mqas/',label:'See it on Instagram'},
    anim: 'animGKFourConeProgression', animMs: 7000
  },
  {
    id:'gk9', cat:'goalkeeper', name:'Colour Cone Reaction Save', duration:10,
    setup:'Set up 4 different coloured cones in a small box, 1 yard apart from each other, positioned 1 yard in front of the middle of the goal. The keeper stands in the middle of the box. The coach calls out a colour — the keeper must reach down and touch that coloured cone. While the keeper is getting down to touch it, the coach shoots, and the keeper must react quickly and get across to make the save.',
    points:['React the instant the colour is called — don\'t hesitate','Touch the cone properly, then recover your stance immediately','Watch for the strike as you\'re coming back up — it can come at any moment','Get your whole body across for the save, not just a hand'],
    progression:'Coach varies the delay between the cone touch and the shot to sharpen reaction speed. Call two colours in a row before the shot to test concentration.',
    cues:['React to the call!','Touch and recover','Stay alert coming up','Whole body across'],
    diagram:'gkcolorcone', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DYXgdi4Raqr/',label:'See it on Instagram'},
    anim: 'animGKColorCone'
  },
  {
    id:'gk10', cat:'goalkeeper', name:'Goal Line Touch & Turn Save', duration:10,
    setup:'Set out 6 different coloured cones along the goal line — 3 to the left of the middle, 3 to the right. The keeper stands in the middle of the goal line, facing INTO the goal (back to the field). The coach calls out a colour — the keeper must touch that coloured cone, then turn back around and save a ball thrown toward goal by the coach.',
    points:['Locate the called cone quickly — know your layout before "go"','Touch it cleanly, then turn immediately — don\'t linger facing the wrong way','Pick up the throw as early as possible as you turn','Get your body set even off a quick turn — don\'t just react with an arm'],
    progression:'Coach varies the delay before throwing to test concentration. Call two cones in sequence before the throw for an extra layer of decision-making.',
    cues:['Know your layout!','Touch and turn fast','Find the ball early','Get set on the turn'],
    diagram:'gkgoallineturn', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DSpgOjbjEfy/',label:'See it on Instagram'},
    anim: 'animGKGoalLineTurn'
  },
  {
    id:'gk11', cat:'goalkeeper', name:'Box Footwork High Catch', duration:10,
    setup:'Set up a 1 yard square box using 4 cones, with the coach lined up facing the front of the box. The keeper starts behind the box. On "go", the keeper moves quickly forward through the box to the front, where the coach throws a ball above head height for the keeper to catch. The keeper catches it, throws it straight back to the coach, then moves quickly backwards through the box to the start position. Repeat continuously.',
    points:['Quick, light feet through the box — don\'t stomp or drag your feet','Get your hands up early and attack the catch at the highest point','Strong, accurate throw straight back to the coach','Move backwards under control — don\'t just fall back off balance'],
    progression:'Increase the speed/rhythm of the repetitions. Vary the height and direction of the throw slightly to test adjustment.',
    cues:['Quick light feet!','Attack the catch','Strong throw back','Controlled retreat'],
    diagram:'gkboxfootwork', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DOebdV8DqEG/',label:'See it on Instagram'},
    anim: 'animGKBoxFootwork'
  },
  {
    id:'gk12', cat:'goalkeeper', name:'Pole Round Low Dive', duration:10,
    setup:'Set a single pole 3 yards out from goal and 2 yards in from the keeper\'s left post. The keeper starts on their own left post. On "go", the keeper rounds the pole and dives low to save a shot struck by the coach, who faces the goal and shoots from their own right, into their own bottom-right corner — which is the same side as the keeper\'s left post and starting position.',
    points:['Round the pole tightly — don\'t drift wide and lose distance','Get low early into the dive, don\'t leave it late','Get your body fully behind the ball, not just an outstretched hand','Reset quickly after each rep, ready to go again from the post'],
    progression:'Coach varies the angle and power of the strike. Mirror the drill on the right post, diving to the right corner.',
    cues:['Round it tight!','Get low early','Body behind it','Reset fast'],
    diagram:'gkpoleround', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/Db6kiO2x0Iu/',label:'See it on Instagram'},
    anim: 'animGKPoleRound'
  },
  {
    id:'gk13', cat:'goalkeeper', name:'Correct Shape K Save', duration:10,
    setup:'Lay out 6 balls in a line, 1 yard apart. The coach stands on one side of the line, the keeper on the other, facing each other. The coach shimmies side to side along the line, and the keeper mirrors the coach\'s movement, staying low and ready. At any moment the coach strikes one of the balls — the keeper must get into the correct low "K" shape (knee down, hands ready, body angled) to block or save it.',
    points:['Mirror the coach\'s movement exactly — stay square, don\'t lag behind','Stay low throughout the shimmy — don\'t stand tall between reps','Get into the K shape early, not as a last-second scramble','React to the strike, not to the coach\'s run-up'],
    progression:'Coach varies the speed and timing of the shimmy to test focus. Add a second ball for a rapid follow-up save.',
    cues:['Mirror exactly!','Stay low throughout','Set the K shape early','React to the strike'],
    diagram:'gkshapek', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/reel/DckCd0dtTl0/',label:'See it on Instagram'},
    anim: 'animGKShapeK'
  },
  {
    id:'gk14', cat:'goalkeeper', name:'Four Pole Cross-Goal Dive', duration:12,
    setup:'Set 4 poles in a line, level with the keeper\'s right post, 1 yard apart from each other and running out from that post. The keeper starts at the post. On "go", the keeper side-runs around the first pole, then dives low across goal to save a shot from the coach heading for the keeper\'s left post. The keeper then side-runs around the next pole in the line and repeats the cross-goal dive, continuing until they\'ve worked around all 4 poles.',
    points:['Quick side-shuffle around each pole — don\'t turn your back on the coach','Push off explosively into the cross-goal dive — it\'s a full-length save each time','Get your body fully behind the ball at the far post, not just a hand','Reset instantly after each rep, ready to shuffle to the next pole'],
    progression:'Coach varies the timing of the strike after each pole. Mirror the whole set-up off the left post, working poles out from there instead.',
    cues:['Quick side shuffle!','Explosive push-off','Full body behind it','Reset fast'],
    diagram:'gkfourpolecross', viewBox:'0 0 300 200',
    instagram:{url:'https://www.instagram.com/p/CV5LppslYTc/',label:'See it on Instagram'},
    anim: 'animGKFourPoleCross', animMs: 7000
  },
  {
    id:'gk15', cat:'goalkeeper', name:'Ground Seated Catching', duration:8,
    setup:'The keeper sits on the ground facing the coach. The coach kicks or throws the ball to the keeper\'s left, right, or straight down the middle — the keeper must move quickly from the seated position to get their body behind the ball and catch it cleanly.',
    points:['Use your hands and hips together to shift quickly across the ground','Get your whole body behind the ball, don\'t just reach with the arms','Catch it, don\'t just block it — secure possession every time','Reset to the central seated position quickly after each catch'],
    progression:'Coach increases the pace and varies the height slightly. Add a quick throw back to the coach after each catch to build a second phase.',
    cues:['Move quick from the ground!','Body behind it','Catch, don\'t block','Reset to centre'],
    diagram:'gkgroundseated', viewBox:'0 0 300 200',
    facebook:{url:'https://www.facebook.com/share/r/1Dfd5zdr3L/',label:'See it on Facebook'},
    anim: 'animGKGroundSeated'
  },
  {
    id:'gk16', cat:'goalkeeper', name:'Catch & React Cross Dive', duration:10,
    setup:'The keeper starts 2 yards outside either post of a small goal (not between the posts). The coach kicks a ball at varying heights directly at the keeper to catch. As soon as the keeper catches it, the coach immediately strikes a second ball at the small goal — the keeper must react instantly, dive low across the goal, and save it.',
    points:['Catch the first ball cleanly and securely — don\'t fumble the start of the sequence','Get rid of any hesitation after the catch — the second ball comes immediately','React to the strike, not to the coach\'s run-up','Get full body behind the second ball, not just an outstretched arm'],
    progression:'Coach varies the height of the first ball and the angle of the second. Switch the keeper\'s starting side each set.',
    cues:['Catch it clean!','No hesitation','React fast','Full body behind it'],
    diagram:'gkcatchreact', viewBox:'0 0 300 200',
    facebook:{url:'https://www.facebook.com/share/r/186xTbft2U/',label:'See it on Facebook'},
    anim: 'animGKCatchReact'
  },
  {
    id:'gk17', cat:'goalkeeper', name:'Tracking & 1v1 or Shot', duration:12,
    setup:'Keeper starts in the middle of the goal. Two coaches stand 2 yards out from the middle of the goal, 4 yards apart, and pass the ball quickly between themselves — the keeper must track the ball, shuffling left and right in line with it. A third coach stands 8 yards out from goal with a ball. At a moment of their choosing, this coach either shoots or drives forward 1v1 at the keeper — the keeper must read which it is and react, either blocking the shot or standing up well to make the 1v1 save.',
    points:['Stay on your toes tracking the passing — don\'t flat-foot between shuffles','Keep scanning for the third coach, don\'t fixate only on the passers','Read the shooter\'s body shape early to judge shot vs. drive','On the 1v1, stay big and patient — don\'t dive in early','On the shot, get your body behind it, set and balanced'],
    progression:'Vary how long the passing phase runs before the third coach engages. Add a rebound: if saved, the first two coaches can follow in for a second ball.',
    cues:['Track the ball!','Stay on your toes','Read the shooter','Stay big on the 1v1'],
    diagram:'gktracking1v1', viewBox:'0 0 300 220',
    instagram:{url:'https://www.instagram.com/reel/Dc_Zv_MOTuh/',label:'See it on Instagram'},
    anim: 'animGKTracking1v1'
  },
  // ── ATTACK V DEFENCE ──
  {
    id:'ad1', cat:'attackdef', name:'3v3 with 2 Small Goals', duration:15,
    setup:'Mark a pitch roughly 40 x 20 yards with a dashed centre line and cones at the corners and halfway points. Place two small goals on each end line, with spare balls beside them. Play 3v3: each team attacks the two small goals at the far end and defends the two at its own end. Remaining players wait beside the pitch and rotate in for the next game. Coach feeds a new ball from the spare balls when one goes dead.',
    points:['Attackers: pass and move, create 2v1 overloads around the goals','Defenders: stay goalside, communicate who marks who','Switch play quickly to the far goal when the near one is covered','Recover fast the moment possession is lost','Take a shot early when you see an open goal'],
    progression:'Limit touches, or rotate players in on a timer.',
    cues:['Pass and move','Talk to your team','Switch play','Recover quickly'],
    diagram:'attackdefence', viewBox:'0 0 220 350',
    instagram:{url:'https://www.instagram.com/reel/DAF5Ny3tHpC/',label:'See it on Instagram'},
    anim: 'animAttackDefence', animMs: 7000
  },
  {
    id:'ad2', cat:'attackdef', name:'2v2 Winner Stays On', duration:15,
    setup:'Mark a playing grid roughly 20 x 15 yards. Place two mini-goals on each of the four sides (8 goals in total). Four teams of two: one pair stands by the goals on each side. Two pairs play 2v2 inside the grid. The incoming pair always attacks the two goals on the opposite side of the grid from where they started. The pair that stayed on switches to defend those same goals, and when they win the ball they attack the goals on the side the incoming pair started from. The incoming pair always starts with the ball (coach or waiting pair passes it in). When a pair scores, they stay on and defend against a fresh pair from the waiting teams; the losing pair goes to the back of the queue. Keep it non-stop, with spare balls beside the goals.',
    points:['Attack quickly: pass and move to create space for a shot','Defenders: stay goalside and talk, one presses, one covers','Switch your focus fast when possession changes','Fresh pairs enter on the coach\'s call or as soon as a goal is scored','Keep the tempo high and the decisions sharp'],
    progression:'Add a two-touch limit, or award a bonus when the winners score twice in a row. Play to a set number of wins and rotate the pairs.',
    cues:['Pass and move','Talk to your partner','Quick transitions','Go again!'],
    diagram:'winnerstayson', viewBox:'0 0 260 300',
    instagram:{url:'https://www.instagram.com/reel/DJooeTCMTvS/',label:'See it on Instagram'},
    anim: 'animWinnerStaysOn'
  },
  {
    id:'ad3', cat:'attackdef', name:'Crossing Drill', duration:15,
    setup:'Use a goal with a keeper and the penalty box. Two defenders start inside the box and the next two defenders wait just outside each post on the goal line. Put two cones about 10 yards outside the box, one left and one right of centre, with a queue of attackers behind each and a pile of balls nearby. The front attacker of each queue stands just ahead of their cone. Put a cone out wide on each flank, level with the queues, with one or two wingers on each. The attacker on the crossing side passes the ball out to their winger, then both front attackers make runs into the box. The winger dribbles down the line and crosses. It is 2v2 in the box plus the keeper: the attackers try to score from the cross, the defenders try to clear it. After the go, the two defenders step out to wait beside the posts and the two waiting defenders step in, the attackers go to the back of their queues and the winger goes to the back of the wing queue. The next pair go straight away with the cross coming from the other wing, so the wings alternate every go.',
    points:['Attackers: time your run so you arrive as the cross comes in, not before','One runner attacks the near post, the other goes to the far post','Get across your defender to the ball, first touch is a shot','Winger: get your head up early and pick out a runner, low and hard across the six-yard box is hardest to defend','Defenders: stay goalside and keep your attacker in front of you, see the ball and your runner','Defenders: when the ball comes in, attack it and clear it wide'],
    progression:'Add a third attacker arriving late at the edge of the box (3v2), let the defenders counter to a small goal if they win it, or ask the winger to cross first time.',
    cues:['Near post, far post','Attack the ball!','Arrive on time','Stay goalside'],
    diagram:'crossingdrill', viewBox:'0 0 300 250',
    instagram:{url:'https://www.instagram.com/reel/DIE4teYNhjv/',label:'See it on Instagram'},
    anim: 'animCrossingDrill', animMs: 8000
  },
];

const GLOBAL_CUES = [
  'Fast approach, slow arrival',
  'Head on a swivel',
  'Get goalside',
  "Don't dive in!",
  'Force them wide',
  'Talk to your partner!',
  'Make yourself big',
  'Press on a bad touch',
  'Hold shape — delay!',
  'Arrive with pace',
  'Third man run!',
  'One-touch if you can',
];
