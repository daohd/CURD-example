using WebAPI.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace WebAPI.Repository
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Product>> GetEmployees();
        Task<Product> GetEmployeeByID(int ID);
        Task<Product> InsertEmployee(Product objEmployee);
        Task<Product> UpdateEmployee(Product objEmployee);
        bool DeleteEmployee(int ID);
    }
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly APIDbContext _appDBContext;

        public EmployeeRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Product>> GetEmployees()
        {
            return await _appDBContext.Employees.ToListAsync();
        }

        public async Task<Product> GetEmployeeByID(int ID)
        {
            return await _appDBContext.Employees.FindAsync(ID);
        }

        public async Task<Product> InsertEmployee(Product objEmployee)
        {
            _appDBContext.Employees.Add(objEmployee);
            await _appDBContext.SaveChangesAsync();
            return objEmployee;
        }

        public async Task<Product> UpdateEmployee(Product objEmployee)
        {
            _appDBContext.Entry(objEmployee).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objEmployee;
        }

        public bool DeleteEmployee(int ID)
        {
            bool result = false;
            var department = _appDBContext.Employees.Find(ID);
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