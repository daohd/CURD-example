using System;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using WebAPI.Repository;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IProductRepository _Product;
        private readonly ICustomerRepository _customer;

        public ProductController(IWebHostEnvironment env,
            IProductRepository Product,
            ICustomerRepository customer)
        {
            _env = env;
            _Product = Product ?? throw new ArgumentNullException(nameof(Product));
            _customer = customer ?? throw new ArgumentNullException(nameof(customer));
        }

        [HttpGet]
        [Route("GetProduct")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _Product.GetProducts());
        }


        [HttpPost]
        [Route("InsertProduct")]
        public async Task<IActionResult> InsertProduct(Product product)
        {

            var result = await _Product.InsertProduct(product);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }

            return Ok("Added Successfully");
        }


        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            var result = await _Product.UpdateProduct(product);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var result = _Product.DeleteProduct(id);
            return new JsonResult("Deleted Successfully");
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    stream.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }


        [Route("GetAllProducts")]
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            return Ok(await _Product.GetProducts());
        }
    }
}
