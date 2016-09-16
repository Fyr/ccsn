// Получаем сообщение из основного потока
addEventListener('message', function(e){
	/* Works! class invoked by createClass
	importScripts('/js/vendor/class.js', '/js/myclass.js');

	var murka = new Kitty('murka');
	console.log( murka.eat(), murka.say());
	*/

	importScripts('/js/vendor/browser.min.js', '/js/test-es6.js');
	const cp = new ColorPoint(25, 8, 'green');
	console.log(cp.toString());
	setInterval(messageByTimeout, 1000, e.data);
});

function messageByTimeout(e){
	// Отправляем сообщение в основной поток
	// e.method();
	console.log(e);
	postMessage('Прокнул поток №'+ e.id);
}
