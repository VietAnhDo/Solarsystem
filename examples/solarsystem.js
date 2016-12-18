/*
Planet	  Distance           Diameter
Sun       0                  2*695,700 km
Mercury	  57,910,000 km      4,800 km
Venus	  108,200,000 km     12,100 km
Earth	  149,600,000 km     12,750 km
Mars	  227,940,000 km     6,800 km
Jupiter	  778,330,000 km     142,800 km
Saturn	  1,424,600,000 km   120,660 km
Uranus	  2,873,550,000 km   51,800 km
Neptune	  4,501,000,000 km   49,500 km
Pluto	  5,945,900,000 km   3,300 km

earth -> moon: 384,400 km
*/
var ratio = 1;
var unit = 3300.0;

var sunDiameter    = 2*695700;
var mercuryDiameter = 4800;
var venusDiameter = 12100;
var earthDiameter = 12750;
var marsDiameter = 6800;
var jupiterDiameter = 142800;
var saturnDiameter = 120660;
var uranusDiameter = 51800;
var neptuneDiameter = 49500;
var plutoDiameter   = 3300;

var deltaDis = sunDiameter*500; // sunDiamenter / 2;
var mercuryDis = 57910000 + deltaDis;
var venusDis = 108200000 + deltaDis;
var earthDis = 149600000 + deltaDis;
var marsDis  = 227940000 + deltaDis;
var jupiterDis = 778330000 + deltaDis;
var saturnDis = 1424600000 + deltaDis;
var uranusDis  = 2873550000 + deltaDis;
var neptuneDis = 4501000000 + deltaDis;
var plutoDis   = 5945900000 + deltaDis;
var earthMoonDis = 384400 + earthDiameter * 1000;

// AroundMotion
var aroundMotion = function(planet, angle) {
	return function(delta) {
		planet.rotation.y += angle * delta;
	}
}

// Clock
var clock = new THREE.Clock();

// onRenderFcts
var onRenderFcts = [];
// solarSystem
var solarSystem = new THREE.Object3D();
scene.add(solarSystem);

// Sun
var sunMesh = THREEx.Planets.createSun();
// sunMesh.scale.multiplyScalar(1);
solarSystem.add(sunMesh);
initPlanet(sunMesh, {diameter: sunDiameter});
// sun light
var light = new THREE.PointLight( 0xffffff, 2 , 10000, 1 );
light.position.set( 0, 0, 0 );
scene.add( light );
// Sun motions

function initPlanet(planet, options = {}) {
	if(options.hasOwnProperty('diameter'))
		planet.scale.multiplyScalar(options.diameter/unit * ratio);
	if(options.hasOwnProperty('distFromSun'))
		planet.position.set(options.distFromSun/unit * ratio * 0.001, 0, 0);
	if(options.hasOwnProperty('aroundItself'))
		onRenderFcts.push(aroundMotion(planet, options.aroundItself));
	// console.log(planet);
	// console.log(options.diameter/unit * ratio);
	// console.log(options.distFromSun/unit * ratio);
}
// Mercury
var mercuryOrbit = new THREE.Object3D();
var mercuryMesh = THREEx.Planets.createMercury();
initPlanet(mercuryMesh, {diameter: mercuryDiameter, distFromSun: mercuryDis, aroundItself: Math.PI/3});
mercuryOrbit.add(mercuryMesh);
solarSystem.add(mercuryOrbit);
// Mercury motions
// onRenderFcts.push(aroundMotion(mercuryOrbit, Math.PI/18));

// Venus
var venusOrbit = new THREE.Object3D();
var venusMesh = THREEx.Planets.createVenus();
initPlanet(venusMesh, {diameter: venusDiameter, distFromSun: venusDis, aroundItself: Math.PI/4});
venusOrbit.add(venusMesh);
solarSystem.add(venusOrbit);
// Venus motions
// onRenderFcts.push(aroundMotion(venusOrbit, Math.PI/20));

// Earth and Moon
var earthOrbit = new THREE.Object3D();
var earthContainer = new THREE.Object3D();
var earthMesh = THREEx.Planets.createEarth();
earthContainer.add(earthMesh);
earthContainer.rotateZ(-23.5 * Math.PI/180)
initPlanet(earthContainer, {distFromSun: earthDis});
initPlanet(earthMesh, {diameter: earthDiameter, aroundItself: Math.PI/64});

var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var material	= THREEx.createAtmosphereMaterial()
material.uniforms.glowColor.value.set(0x00b3ff)
material.uniforms.coeficient.value	= 0.8
material.uniforms.power.value		= 2.0
var mesh	= new THREE.Mesh(geometry, material );
mesh.scale.multiplyScalar(earthDiameter/unit * ratio + 0.2);
earthContainer.add( mesh );
// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var material	= THREEx.createAtmosphereMaterial()
material.side	= THREE.BackSide
material.uniforms.glowColor.value.set(0x00b3ff)
material.uniforms.coeficient.value	= 0.5
material.uniforms.power.value		= 4.0
var mesh	= new THREE.Mesh(geometry, material );
mesh.scale.multiplyScalar(earthDiameter/unit * ratio + 0.5);
earthContainer.add( mesh );
// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

var earthCloud	= THREEx.Planets.createEarthCloud()
// earthCloud.receiveShadow	= true
earthCloud.castShadow	= true
earthCloud.scale.multiplyScalar(earthDiameter/unit * ratio + 0.03);
earthContainer.add(earthCloud)
onRenderFcts.push(function(delta, now){
	earthCloud.rotation.y += 1/8 * delta;		
})

var moonOrbit = new THREE.Object3D();
var moonMesh = THREEx.Planets.createMoon();
onRenderFcts.push(aroundMotion(moonOrbit, Math.PI/32));
moonMesh.position.set(earthMoonDis/unit * ratio * 0.001, 0, 0);
initPlanet(moonMesh, {diameter: 1000, aroundItself: Math.PI/2});
moonOrbit.add(moonMesh);
earthContainer.add(moonOrbit);
earthOrbit.add(earthContainer);
solarSystem.add(earthOrbit);
// Earth and Moon motions
// onRenderFcts.push(aroundMotion(earthOrbit, Math.PI/22));
// onRenderFcts.push(aroundMotion(moonOrbit, Math.PI));


// Mars
var marsOrbit = new THREE.Object3D();
var marsMesh = THREEx.Planets.createMars();
marsOrbit.add(marsMesh);
initPlanet(marsMesh, {diameter: marsDiameter, distFromSun: marsDis});
solarSystem.add(marsOrbit);

// Jupiter
var jupiterOrbit = new THREE.Object3D();
var jupiterMesh = THREEx.Planets.createJupiter();
jupiterOrbit.add(jupiterMesh);
initPlanet(jupiterMesh, {diameter: jupiterDiameter, distFromSun: jupiterDis});
solarSystem.add(jupiterOrbit);

// Saturn
var saturnOrbit = new THREE.Object3D();
var saturnMesh = THREEx.Planets.createSaturn();
saturnOrbit.add(saturnMesh);
// saturnMesh.receiveShadow	= true
saturnMesh.castShadow		= true
var saturnRing	= THREEx.Planets.createSaturnRing()
// saturnRing.receiveShadow	= true
saturnRing.castShadow		= true
saturnMesh.add(saturnRing)
initPlanet(saturnMesh, {diameter: saturnDiameter, distFromSun: saturnDis});
// console.log(jupiterDis/unit * ratio * 0.005);
// console.log(saturnDis/unit * ratio * 0.005);
solarSystem.add(saturnOrbit);

// Uranus
var uranusOrbit = new THREE.Object3D();
var uranusMesh = THREEx.Planets.createUranus();
uranusOrbit.add(uranusMesh);
initPlanet(uranusMesh, {diameter: uranusDiameter, distFromSun: uranusDis});
solarSystem.add(uranusOrbit);

// Neptune
var neptuneOrbit = new THREE.Object3D();
var neptuneMesh = THREEx.Planets.createNeptune();
neptuneOrbit.add(neptuneMesh);
initPlanet(neptuneMesh, {diameter: neptuneDiameter, distFromSun: neptuneDis});
solarSystem.add(neptuneOrbit);

//Pluto
var plutoOrbit = new THREE.Object3D();
var plutoMesh = THREEx.Planets.createPluto();
plutoOrbit.add(plutoMesh);
initPlanet(plutoMesh, {diameter: plutoDiameter, distFromSun: plutoDis});
// console.log(plutoDiameter/unit * ratio);
// console.log(plutoDis/unit * ratio * 0.005);
solarSystem.add(plutoOrbit);