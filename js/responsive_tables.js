// document.addEventListener('DOMContentLoaded', function () {

//     [...document.querySelectorAll('table')].forEach(function(table) { 
//         console.log("tables here, get your tables");
//         const headers = table.querySelectorAll("thead th[scope='col'");
//         const rows = table.querySelectorAll('tbody > tr');

//         rows.forEach(function(row) {
//             console.log("Rows");
//             row.querySelectorAll(':scope > *').forEach(function(cell, index) {
//                 // Only do the TDs, not the THs
//                 if (cell.nodeName.toLowerCase() === 'td' && cell.innerHTML != '') {
//                     var header = document.createElement('span');
//                     header.setAttribute('aria-hidden', 'true');
//                     header.classList.add('table-header-mobile');
//                     header.innerHTML = headers[index].innerHTML;
//                     cell.prepend(header);
//                 }
                
//             });
           
//                         // header.innerHTML = header[index];
//             // console.log(header);
//         })
//     });

// }, false);