using WebAPI.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace WebAPI.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProductByName(string Productname);
        Task<Product> InsertProduct(Product objProduct);
        Task<Product> UpdateProduct(Product objProduct);
        bool DeleteProduct(int ID);
    }
    public class ProductRepository : IProductRepository
    {

        private readonly APIDbContext _appDBContext;

        public ProductRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var lstPrduct =  await _appDBContext.Products.ToListAsync();
            return lstPrduct.OrderByDescending(o => o.Price).ToList() ;
        }

        public async Task<Product> GetProductByName(string name)  
        {
            return await _appDBContext.Products.FindAsync(name);
        }

        public async Task<Product> InsertProduct(Product objProduct)
        {
            _appDBContext.Products.Add(objProduct);
            await _appDBContext.SaveChangesAsync();
            return objProduct;
        }

        public async Task<Product> UpdateProduct(Product objProduct)
        {
            _appDBContext.Entry(objProduct).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objProduct;
        }

        public bool DeleteProduct(int ID)
        {
            bool result = false;
            var department = _appDBContext.Products.Find(ID);
            if (department != null)
            {
                _appDBContext.Entry(department).State = EntityState.Deleted;
                _appDBContext.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }
    }
}