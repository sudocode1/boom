window.onload = async () => {
    const json = await fetch('https://raw.githubusercontent.com/sudocode1/boom/master/docs/docs.json')
        .then(d => d.json())
        .catch(() => []);
    const name = new URLSearchParams(window.location.search)
        .entries()
        .next()
        .value?.[0];
    const ex = json.find(x => [x.name, x.file || ''].includes(name?.toLowerCase()));
    if (!ex) {
        document.title = 'Boom Documentation';
        document.head.innerHTML += '<link rel="stylesheet" href="./main.css">';
        document.body.innerHTML = `
<div class="title">
    <h1 style="text-align: center; font-size: 100px;">
        Boom Documentation
    </h1>
</div>
<h1>
    This website shows every element of Boom with a basic explanation.
    <br>
    This is NOT a tutorial.
</h1>
<h2>
    This documentation is for Boom
    <code>v2.0</code>
</h2>
<table align="right" style="width: 50%;">
    <tr style="background-color: black;">
        <th>Element</th>
        <th>Documented</th>
    </tr>

    <tr>
        <th>String</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Math</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Newline</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Date</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Random</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Variable</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Edit Variable</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Show Variable</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Show Variable Type</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>If</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Otherwise If</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Otherwise</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Loop</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>While</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Run</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Comment</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Case</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Replace</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/yes.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Split</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/no.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Search</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/no.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>File</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/no.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>Sort</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/no.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>JSON</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/no.png?raw=true" class="documented"></th>
    </tr>

    <tr>
        <th>SQRT</th>
        <th><img src="https://github.com/sudocode1/boom/blob/master/assets/no.png?raw=true" class="documented"></th>
    </tr>

    <tr style="background-color: black;">
        <th>Percentage Documented</th>
        <th>75%</th>
    </tr>
    
</table>
<h2>Full list of elements</h2>
${
    json
        .map(x => `<h3><a href="?${x.name}">${x.file || x.name}</a>${x.expl ? ` (${x.expl})` : ''}</h3>`)
        .join('')
}`;
    } else {
        const title = ex.name[0].toUpperCase() + ex.name.slice(1);
        document.title = title;
        document.head.innerHTML += '<link rel="stylesheet" href="./doc.css">';
        document.body.innerHTML = `<h1>${title}</h1>${ex.code.map(x => `<div class="code"><code>${x}</code></div>`)}<h2>${ex.desc.join('<br>')}</h2>`;
    }
};