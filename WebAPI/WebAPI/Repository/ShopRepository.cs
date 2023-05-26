using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public interface IShopRepository
    {
        Task<IEnumerable<Shop>> GetShops();
        Task<Shop> GetShopByID(int ID);
        Task<Shop> InsertShop(Shop objShop);
        Task<Shop> UpdateShop(Shop objShop);
        Task<int> CountShop();
        bool DeleteShop(int ID);
    }


    public class ShopRepository : IShopRepository
    {
        private readonly APIDbContext _appDBContext;

        public ShopRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Shop>> GetShops()
        {
            var lst =  await _appDBContext.Shops.ToListAsync();

            return lst.OrderByDescending(o => o.Location).ToList() ;
        }

        public async Task<int> CountShop()
        {
            return await _appDBContext.Shops.AsNoTracking().CountAsync();
        }

        public async Task<Shop> GetShopByID(int ID)
        {
            return await _appDBContext.Shops.FindAsync(ID);
        }

        public async Task<Shop> InsertShop(Shop objShop)
        {
            _appDBContext.Shops.Add(objShop);
            await _appDBContext.SaveChangesAsync();
            return objShop;
        }

        public async Task<Shop> UpdateShop(Shop objShop)
        {
            _appDBContext.Entry(objShop).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objShop;
        }

        public bool DeleteShop(int ID)
        {
            bool result = false;
            var department = _appDBContext.Shops.Find(ID);
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

