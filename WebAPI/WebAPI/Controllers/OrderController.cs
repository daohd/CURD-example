using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _order;
        private readonly ICustomerRepository _customer;
        private readonly IProductRepository _Product;
        private readonly IShopRepository _shop;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepository order,ICustomerRepository customer,IShopRepository shop,IProductRepository Product)
        {
            _order = order ?? throw new ArgumentNullException(nameof(order));
            _customer = customer ?? throw new ArgumentNullException(nameof(customer));
            _shop = shop ?? throw new ArgumentNullException(nameof(shop));
            _Product = Product ?? throw new ArgumentNullException(nameof(Product));
        }

        [HttpGet]
        [Route("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {

            if (await _customer.CountCustomer() < 30 || await _shop.CountShop() < 3 || await _Product.CountProduct() < 30)
                return Ok(new Order());

            return Ok(await _order.GetOrders());
        }

        [HttpPost]
        [Route("createOrder")]
        public async Task<IActionResult> createOrder(OrderInput order)
        {

            //if (order == null || order.lstProduct?.Count <= 0) return NotFound("Not found");

            //foreach (var item in order.lstProduct) {

            //    var objorder = new Order()
            //    {
            //        CustomerId = order.CustomerId,
            //        ProductId = item.ProductId
            //    };

            //    var result = await _order.CreateOrder(objorder);
            //    if (result == null)
            //    {
            //        return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            //    }
            //}


            var result = await _order.CreateOrder(_mapper.Map<Order>(order));
            if (result == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }

            return Ok("Added Successfully");
        }

    }
}
