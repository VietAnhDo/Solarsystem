var goStraightAhead = function(cur, dir, type=1) {
	cur.x += type*dir.x / 20.0;
	cur.y += type*dir.y / 20.0;
	cur.z += type*dir.z / 20.0;
	return cur;
}

var turn = function(dir, phi, type=1) {
	newZ = dir.z * Math.cos(phi*type) - dir.x * Math.sin(phi*type);
	newX = dir.z * Math.sin(phi*type) + dir.x * Math.cos(phi*type);
	dir.x = newX;
	dir.z = newZ;
	return dir;
}
var watchBack = 1;
function addVect(vec1, vec2) {
	if( vec2 == undefined) {
		console.log("error");
		return {x: 0, y:0, z:0};
	}
	return {x:vec1.x + watchBack*vec2.x, y:vec1.y + watchBack*vec2.y, z:vec1.z + watchBack*vec2.z};
}

var onKeyDown = function(event) {
	// console.log("event");
	// console.log(event);
	// return;
	keycode = event.key;
	console.log(event);
	if( keycode == 'b')
		watchBack *= -1;
	if( keycode == 'j') {
		turn(camera.do_dir, camera.do_phi);
		console.log("press j");
		camPos = {x: camera.position.x, y: camera.position.y, z:camera.position.z};
		goStraightAhead(camPos, camera.do_dir);
		camera.position.x = camPos.x;
		camera.position.y = camPos.y;
		camera.position.z = camPos.z;
	}
	else if( keycode == 'l') {
		turn(camera.do_dir, camera.do_phi, -1);
		console.log("press l");
		camPos = {x: camera.position.x, y: camera.position.y, z:camera.position.z};
		goStraightAhead(camPos, camera.do_dir);
		camera.position.x = camPos.x;
		camera.position.y = camPos.y;
		camera.position.z = camPos.z;
	}
	else if( keycode == 'i') {
		camPos = {x: camera.position.x, y: camera.position.y, z:camera.position.z};
		goStraightAhead(camPos, camera.do_dir);
		camera.position.x = camPos.x;
		camera.position.y = camPos.y;
		camera.position.z = camPos.z;
		console.log("press i");
	}
	else if( keycode == 'k') {
		camPos = {x: camera.position.x, y: camera.position.y, z:camera.position.z};
		goStraightAhead(camPos, camera.do_dir, -1);
		camera.position.x = camPos.x;
		camera.position.y = camPos.y;
		camera.position.z = camPos.z;
		console.log("press k");
	}
}