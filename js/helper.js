console.time()
const allElem = document.querySelectorAll('body *');
const head = document.head;

const sizes = [{sizeName: 'sm', size: 576}, {sizeName: 'md', size: 768}, {sizeName: 'lg', size: 992}, {sizeName: 'xl',size: 1200}, {sizeName: 'xxl', size: 1400}];

const classTypes = [
    {minClass: 'h-', styleName: 'height'},
    {minClass: 'w-', styleName: 'width'},
    // MARGIN
    {minClass: 'me-', styleName: 'margin-right'},
    {minClass: 'ms-', styleName: 'margin-left'},
    {minClass: 'mt-', styleName: 'margin-top'},
    {minClass: 'mb-', styleName: 'margin-bottom'},
    {minClass: 'm-', styleName: 'margin'},
    // PADDING
    {minClass: 'pe-', styleName: 'padding-right'},
    {minClass: 'ps-', styleName: 'padding-left'},
    {minClass: 'pt-', styleName: 'padding-top'},
    {minClass: 'pb-', styleName: 'padding-bottom'},
    {minClass: 'p-', styleName: 'padding'},
    // FONT SIZE
    {minClass: 'fs-', styleName: 'font-size'},
    {minClass: 'br-', styleName: 'border-radius'},
    {minClass: 'lh-', styleName: 'line-height'},
    {minClass: 'ls-', styleName: 'letter-spacing'},
]

const oldClasses = [];

// CREATING STYLE TAGS
const style = document.createElement('STYLE');
const medias = document.createElement('STYLE');


allElem.forEach((item) => {
    item.classList.forEach((className) => {
        const checkingImportant = chekWork(className);
        const type = classTypes.find((classType) => !className.indexOf( checkingImportant + classType.minClass) && !oldClasses.includes(className));
        if (type) {
            const { checkInp, percent, newClassNem } = {
                checkInp:  className.includes('!') ? '!important' : '',
                percent: className.includes('%') ? '%' : 'rem',
                newClassNem: className.replace(/[!,%]/g, '')
            }
            const classCount = newClassNem.split('-')[1];
            const classCountTwo = newClassNem.split('-')[2];
            if (classCountTwo) {
                sizes.forEach((_size) => {
                    const mediaClassName = `${type.minClass}${_size.sizeName}`;
                    if (newClassNem.includes(mediaClassName) && !oldClasses.includes(className)) {
                        oldClasses.push(newClassNem);
                        medias.innerHTML = `${medias.innerHTML} @media (min-width: ${_size.size}px){.${newClassNem}{${type.styleName}: ${className.includes('%') ?  classCountTwo : classCountTwo / 16}${percent} ${checkInp};}}`;
                    }
                })
            } else {
                if (newClassNem.includes(type.minClass) && !oldClasses.includes(className)) {
                    oldClasses.push(newClassNem);
                    style.innerHTML = `${style.innerHTML} .${newClassNem}{${type.styleName}: ${className.includes('%') ? classCount : classCount / 16}${percent} ${checkInp};}`;
                }
            }
        }
    })
    if(String(item.className).includes('!') || String(item.className).includes('%')){
        item.className = item.className.replace(/[!,%]/g, '')
    }
})


function chekWork(className){
    return className.includes('!') ? '!' : className.includes('%') ? '%': '';
}


head.appendChild(style);
head.appendChild(medias);

console.timeEnd()


// const svgIcons = [
//     {
//         name: 'invoice',
//         svg: '<svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.73884 7.4672H3.25292V8.43904H3.73884V7.4672ZM9.56987 8.43904H10.0558V7.4672H9.56987V8.43904ZM3.73884 9.90166H3.25292V10.3876H3.73884V9.90166ZM9.56987 9.90166V10.3876H10.0558V9.90166H9.56987ZM3.73884 6.0143V5.52838H3.25292V6.0143H3.73884ZM9.56987 6.0143H10.0558V5.52838H9.56987V6.0143ZM12.4854 4.07063H12.9713V3.86946L12.8294 3.7266L12.4854 4.07063ZM9.56987 1.15511L9.9139 0.811078L9.77104 0.669189H9.56987V1.15511ZM3.73884 8.43904H9.56987V7.4672H3.73884V8.43904ZM3.73884 10.3876H9.56987V9.41574H3.73884V10.3876ZM3.73884 6.50022H9.56987V5.52838H3.73884V6.50022ZM11.5136 14.2749H1.79516V15.2468H11.5136V14.2749ZM1.30924 13.789V2.12695H0.337402V13.789H1.30924ZM11.9995 4.07063V13.789H12.9713V4.07063H11.9995ZM1.79516 1.64103H9.56987V0.669189H1.79516V1.64103ZM9.22584 1.49914L12.1414 4.41466L12.8294 3.7266L9.9139 0.811078L9.22584 1.49914ZM1.79516 14.2749C1.66629 14.2749 1.54269 14.2237 1.45156 14.1326C1.36044 14.0415 1.30924 13.9179 1.30924 13.789H0.337402C0.337402 14.1756 0.490987 14.5464 0.76437 14.8198C1.03775 15.0932 1.40854 15.2468 1.79516 15.2468V14.2749ZM11.5136 15.2468C11.9002 15.2468 12.271 15.0932 12.5443 14.8198C12.8177 14.5464 12.9713 14.1756 12.9713 13.789H11.9995C11.9995 13.9179 11.9483 14.0415 11.8571 14.1326C11.766 14.2237 11.6424 14.2749 11.5136 14.2749V15.2468ZM1.30924 2.12695C1.30924 1.99807 1.36044 1.87448 1.45156 1.78335C1.54269 1.69222 1.66629 1.64103 1.79516 1.64103V0.669189C1.40854 0.669189 1.03775 0.822774 0.76437 1.09616C0.490987 1.36954 0.337402 1.74033 0.337402 2.12695H1.30924ZM3.25292 6.0143V9.90166H4.22476V6.0143H3.25292ZM6.16844 6.0143V9.90166H7.14028V6.0143H6.16844ZM9.08395 6.0143V9.90166H10.0558V6.0143H9.08395ZM3.25292 4.55655H6.16844V3.58471H3.25292V4.55655ZM7.14028 12.3313H10.0558V11.3594H7.14028V12.3313Z" fill="#838A90"/> </svg>'
//     }
// ];
//
// const iconsElems = document.querySelectorAll('.svgIcon');
//
// iconsElems.forEach((item) => {
//     const name = item.dataset.name;
//     const className = item.classList;
//     if(name){
//         const findSvg = svgIcons.find((_ic) => _ic.name === name);
//         const oldClass = $(findSvg.svg).attr('class');
//
//         const html = $(findSvg.svg).attr('class', `${oldClass ? oldClass : '' } ${className}`).get(0);
//
//         item.outerHTML = html.outerHTML;
//     }
// })
