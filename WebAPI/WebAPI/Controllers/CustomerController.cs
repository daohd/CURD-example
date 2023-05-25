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
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customer;

        public CustomerController(ICustomerRepository department)
        {
            _customer = department ?? throw new ArgumentNullException(nameof(department));
        }

        [HttpGet]
        [Route("getCustomer")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _customer.GetCustomer());
        }

        [HttpGet]
        [Route("GetCustomerByID/{Id}")]
        public async Task<IActionResult> GetDeptById(int Id)
        {
            return Ok(await _customer.GetCustomerByID(Id));
        }

        [HttpPost]
        [Route("addCustomer")]
        public async Task<IActionResult> Post(Customer cus)
        {
            var result = await _customer.InsertCustomer(cus);
            if (String.IsNullOrEmpty(result.FullName))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Route("updateCustomer")]
        public async Task<IActionResult> Put(Customer cus)
        {
            await _customer.UpdateCustomer(cus);
            return Ok("Updated Successfully");
        }


        [HttpDelete]
        //[HttpDelete("{id}")]
        [Route("deleteCustomer")]
        public JsonResult Delete(int id)
        {
            _customer.DeleteCustomer(id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
