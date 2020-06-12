window.addEventListener("DOMContentLoaded", function () {
  console.log(1);
  const table = document.getElementById("cart");
  const deleteBtns = table.getElementsByClassName("delete-button");
  const updateAmountBtns = table.getElementsByClassName("amount");
  //delete
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", function () {
      let product_id = this.dataset.id;
      //update on db
      let tr = document.getElementById("tr" + product_id);
      let total = document.getElementById('total');
      $.ajax({
        url: "/cart?productID=" + product_id,
        type: "post",
        data: "",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          tr.remove();
          total.setAttribute("value", data);
        },
        async: false,
        error: function (e) {
          console.log(e);
        }
      });
    });
  }
  //end delete

  //update
  for (let i = 0; i < updateAmountBtns.length; i++) {
    updateAmountBtns[i].addEventListener("change", function () {
      let product_id = this.dataset.id;
      let amount = this.value;
      let total = document.getElementById('total');


      // $.ajax({
      //   url: "/cart",
      //   type: "get",
      //   data: "",
      //   contentType: "application/json; charset=utf-8",
      //   success: (data) => {
      //     console.log(data);
      //   },
      //   async: false,
      //   error: (e) => {
      //     console.log(e);
      //   }
      // })

      $.ajax({
        url: "/cart?productID=" + product_id + "&amount=" + amount,
        type: "put",
        data: "",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          console.log(total);
          total.setAttribute("value", data);
        },
        async: false,
        error: function (e) {
          console.log(e);
        }
      });
    });
  }
  //end update
});