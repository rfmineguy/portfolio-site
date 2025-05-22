async function include_templatelib(templatefile, to_include) {
	const res = await fetch(templatefile);
	if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
	const text = await res.text();

	const parser = new DOMParser()
	const doc = parser.parseFromString(text, 'text/html')

	const templates = doc.querySelectorAll('template')

	for (const el of templates) {
		if (to_include.includes(el.id)) {
			document.head.appendChild(el.cloneNode(true))
		}
	}
}

// create the dom element
function template(template_id, replacements, init_function) {
    // Find the template dom element with id=template_id
    const template_obj = document.getElementById(template_id);
    if (!template_obj) {
        console.error(`${template_id} doesnt exist\n`);
        return undefined;
    }

    // Replace all parameterized elements with their replacement
    let contents = template_obj.innerHTML;
    
    const filtered_props = Object.fromEntries(
        Object.entries(replacements).filter(([_, value]) => !Array.isArray(value)) 
    );
    const filtered_array_props = Object.fromEntries(
        Object.entries(replacements).filter(([_, value]) => Array.isArray(value)) 
    );

    for (const [key, value] of Object.entries(filtered_props)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        contents = contents.replace(regex, `${value}`);
    }
    const dom = document.createElement('div');
    dom.innerHTML = contents;
    for (const [key, value] of Object.entries(filtered_array_props)) {
        for (let i = 0; i < value.length; i++) {
            const dom2 = value[i]();
            dom.querySelector(`#${key}`).appendChild(dom2);
        }
    }
    if (init_function) init_function(dom);

    // Create the dom object
    return dom;
}

function emit(dom, parent_id) {
    document.getElementById(parent_id).appendChild(dom);
}
