import Tribute from "tributejs";

// generate value
let values = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
).map(el => ({ key: el, value: `  That's the value of ${el}` }));

var tribute = new Tribute({
  trigger: "*",
  values,
  selectTemplate: function(item) {
    return `<span class="fr-deletable fr-tribute"><b>${
      item.original.key
    }</b> : ${item.original.value} </span>`;
  },
  menuItemTemplate: function(item) {
    return `<small> <b>${item.original.key} : </b>  ${
      item.original.value
    }</small>`;
  }
});

export default tribute;
