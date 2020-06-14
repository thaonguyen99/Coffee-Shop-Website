window.addEventListener("DOMContentLoaded", function () {
  console.log(1);
  const table = document.getElementById("cart");
  const deleteBtns = table.getElementsByClassName("delete-button");
  const updateAmountBtns = table.getElementsByClassName("amount");
  const deleteCart = table.getElementsByClassName('deleteCart');
  //delete
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", function () {
      let product_id = this.dataset.id;
      //update on db
      let tr = document.getElementById("tr" + product_id);
      let subtotal1 = document.getElementById('subtotal1');
      let subtotal2 = document.getElementById('subtotal2');

      $.ajax({
        url: "/cart?productID=" + product_id,
        type: "post",
        data: "",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          tr.remove();
          subtotal1.textContent = data;
          subtotal2.textContent = data;

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
      let subtotal1 = document.getElementById('subtotal1');
      let subtotal2 = document.getElementById('subtotal2');
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
          subtotal1.textContent = data;
          subtotal2.textContent = data;
        },
        async: false,
        error: function (e) {
          console.log(e);
        }
      });
    });
  }
  //end update

  //delete cart
  deleteCart.addEventListener("click", function () {

  });

});