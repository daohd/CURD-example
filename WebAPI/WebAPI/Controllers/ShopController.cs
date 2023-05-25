using AutoMapper;
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
        private readonly IMapper _mapper;

        public ShopController(IShopRepository shop,
                                         ICustomerRepository customer)
        {
            _shop = shop ?? throw new ArgumentNullException(nameof(shop));
            _customer = customer ?? throw new ArgumentNullException(nameof(customer));
        }

        [HttpGet]
        [Route("getShop")]
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
        [Route("addShop")]
        public async Task<IActionResult> InsertShop(ShopInput shop)
        {
            var result = await _shop.InsertShop(_mapper.Map<Shop>(shop));
            if (result.ShopId == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }


        [HttpPut]
        [Route("updateShop")]
        public async Task<IActionResult> UpdateShop(ShopInput shop)
        {
            await _shop.UpdateShop(_mapper.Map<Shop>(shop));
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("deleteShop")]
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
