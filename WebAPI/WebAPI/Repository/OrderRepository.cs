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
        Task<IEnumerable<Order>> GetOrders();
        
    }

    public class OrderRepository : IOrderRepository
    {

        private readonly APIDbContext _appDBContext;

        public OrderRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }        

        public async Task<IEnumerable<Order>> GetOrders()
        {
            var lst =  await _appDBContext.Orders.ToListAsync();

            return lst;
        }

        public async Task<Order> GetOrderByID(int ID)
        {
            return await _appDBContext.Orders.FindAsync(ID);
        }

        
    }
}