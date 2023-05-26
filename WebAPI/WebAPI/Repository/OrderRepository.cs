using WebAPI.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace WebAPI.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<OrderOutPut>> GetOrders();
        Task<Order> CreateOrder(Order objorder);
        
    }

    public class OrderRepository : IOrderRepository
    {

        private readonly APIDbContext _appDBContext;

        public OrderRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }        

        public async Task<IEnumerable<OrderOutPut>> GetOrders()
        {

            var lst =  await _appDBContext.Orders.AsNoTracking().Include(o=>o.Customer).Include(o=>o.Product).ThenInclude(o=>o.Shop).OrderByDescending(o=>o.CreateDate).ToListAsync();


            var result = new List<OrderOutPut>();

            foreach (var order in lst)
            {
                result.Add(new OrderOutPut
                {
                    CustomerId = order.CustomerId,
                    Email = order.Customer.Email,
                    ShopName = order.Product.Shop.ShopName,
                    Location = order.Product.Shop.Location,
                    ProductName = order.Product.ProductName,
                    Price = order.Product.Price,

                });
            }

            return result;
        }

        public async Task<Order> CreateOrder(Order objorder)
        {
            _appDBContext.Orders.Add(objorder);
            await _appDBContext.SaveChangesAsync();
            return objorder;

        }

        public async Task<Order> GetOrderByID(int ID)
        {
            return await _appDBContext.Orders.FindAsync(ID);
        }

        
    }
}