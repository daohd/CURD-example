using WebAPI.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace WebAPI.Repository
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetCustomer();
        Task<Customer> GetCustomerByID(int ID);
        Task<Customer> InsertCustomer(Customer objDepartment);
        Task<Customer> UpdateCustomer(Customer objDepartment);
        bool DeleteCustomer(int ID);
    }

    public class CustomerRepository : ICustomerRepository
    {

        private readonly APIDbContext _appDBContext;

        public CustomerRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }        

        public async Task<IEnumerable<Customer>> GetCustomer()
        {
            var lst =  await _appDBContext.Customers.ToListAsync();

            return lst.OrderBy(o => o.Email).ToList() ;
        }

        public async Task<Customer> GetCustomerByID(int ID)
        {
            return await _appDBContext.Customers.FindAsync(ID);
        }

        public async Task<Customer> InsertCustomer(Customer objcus)
        {
            _appDBContext.Customers.Add(objcus);
            await _appDBContext.SaveChangesAsync();
            return objcus;

        }

        public async Task<Customer> UpdateCustomer(Customer objcus)
        {
            _appDBContext.Entry(objcus).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objcus;

        }

        public bool DeleteCustomer(int ID)
        {
            bool result = false;
            var department = _appDBContext.Customers.Find(ID);
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