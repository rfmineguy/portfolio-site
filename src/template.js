function emit_template_to(template_id, to_id, replacements) {
    const template_obj = document.getElementById(template_id);
    if (!template_obj) {
        console.error(`${template_id} doesnt exist\n`);
        return;
    }
    const tmpl_clone = document.getElementById(template_id).content.cloneNode(true);
    let contents = template_obj.innerHTML;
    for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        contents = contents.replace(regex, `${value}`);
    }
    console.log(contents);

    const obj = document.createElement('div');
    obj.innerHTML = contents;

    const parent_obj = document.getElementById(to_id);
    parent_obj.appendChild(obj);
}

function template(template_id, replacements) {
    const template_obj = document.getElementById(template_id);
    if (!template_obj) {
        console.error(`${template_id} doesnt exist\n`);
        return;
    }
    const tmpl_clone = document.getElementById(template_id).content.cloneNode(true);
    let contents = template_obj.innerHTML;
    for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        contents = contents.replace(regex, `${value}`);
    }
    console.log(contents);

    const obj = document.createElement('div');
    obj.innerHTML = contents;
    return obj;
}

// create the dom element
function template(template_id, replacements) {
    // console.log(`creating template ${template_id}`);
    // Find the template dom element with id=template_id
    const template_obj = document.getElementById(template_id);
    if (!template_obj) {
        console.error(`${template_id} doesnt exist\n`);
        return undefined;
    }

    // Replace all parameterized elements with their replacement
    const tmpl_clone = document.getElementById(template_id).content.cloneNode(true);
    let contents = template_obj.innerHTML;
    
    const filtered_props = Object.fromEntries(
        Object.entries(replacements).filter(([key, value]) => !Array.isArray(value)) 
    );
    const filtered_array_props = Object.fromEntries(
        Object.entries(replacements).filter(([key, value]) => Array.isArray(value)) 
    );
    // console.log("filtered_props", filtered_props);
    // console.log("filtered_array_props", filtered_array_props);

    for (const [key, value] of Object.entries(filtered_props)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        contents = contents.replace(regex, `${value}`);
    }
    const dom = document.createElement('div');
    dom.innerHTML = contents;
    // console.log(dom);
    for (const [key, value] of Object.entries(filtered_array_props)) {
        for (let i = 0; i < value.length; i++) {
            // console.log(value[i]());
            const dom2 = value[i]();
            dom.querySelector(`#${key}`).appendChild(dom2);
            // dom.appendChild(dom2);
        }
    }

    // Create the dom object
    return dom;
}

function emit(dom, parent_id) {
    document.getElementById(parent_id).appendChild(dom);
}
