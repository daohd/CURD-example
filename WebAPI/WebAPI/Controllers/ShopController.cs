using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly IShopRepository _shop;
        private readonly ICustomerRepository _customer;

        public ShopController(IShopRepository shop,
                                         ICustomerRepository customer)
        {
            _shop = shop ?? throw new ArgumentNullException(nameof(shop));
            _customer = customer ?? throw new ArgumentNullException(nameof(customer));
        }

        [HttpGet]
        [Route("GetEmployee")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _shop.GetShops());
        }

        [HttpGet]
        [Route("GetShopByID/{Id}")]
        public async Task<IActionResult> GetShopByID(int Id)
        {
            return Ok(await _shop.GetShopByID(Id));
        }

        [HttpPost]
        [Route("InsertShop")]
        public async Task<IActionResult> InsertShop(Shop shop)
        {
            var result = await _shop.InsertShop(shop);
            if (result.ShopId == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }


        [HttpPut]
        [Route("UpdateShop")]
        public async Task<IActionResult> UpdateShop(Shop emp)
        {
            await _shop.UpdateShop(emp);
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("DeleteShop")]
        //[HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var result = _shop.DeleteShop(id);
            return new JsonResult("Deleted Successfully");
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> GetCustomer()
        {
            return Ok(await _customer.GetCustomer());
        }
    }
}
