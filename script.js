async function getScriptAndData(scriptUrl, dataJsonUrl) {
	try {
		return {
			data: await $.get(dataJsonUrl),
			ResumeData: (await import('./data.js')).default,
			Template: (await import(scriptUrl)).default,
		};
	} catch (err) {
		return null;
	}
}

(function (styleTagId) {
	const template = 2;
	const styleTag = document.getElementById(styleTagId);
	const styleUrl = `./templates/type_${template}/type_${template}_style.css`;
	const scriptUrl = `./templates/type_${template}/type_${template}_script.js`;
	const dataJsonUrl = `./data.json`;
	styleTag.href = styleUrl;
	getScriptAndData(scriptUrl, dataJsonUrl)
		.then(({ data, ResumeData, Template }) => {
			const template = new Template(new ResumeData(data));
			document.body.appendChild(template.getDOM());
			console.log(template);
		})
		.catch((error) => {
			console.error('Fetch Error: Data OR Script');
		});
})('style-tag');
