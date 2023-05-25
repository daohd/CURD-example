using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public interface IEmployeeAngularRepository
    {
        Task<IEnumerable<Shop>> GetEmployees();
        Task<Shop> GetEmployeeByID(int ID);
        Task<Shop> InsertEmployee(Shop objEmployee);
        Task<Shop> UpdateEmployee(Shop objEmployee);
        bool DeleteEmployee(int ID);
    }


    public class EmployeeAngularRepository : IEmployeeAngularRepository
    {
        private readonly APIDbContext _appDBContext;

        public EmployeeAngularRepository(APIDbContext context)
        {
            _appDBContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Shop>> GetEmployees()
        {
            return await _appDBContext.EmployeeAngulars.ToListAsync();
        }

        public async Task<Shop> GetEmployeeByID(int ID)
        {
            return await _appDBContext.EmployeeAngulars.FindAsync(ID);
        }

        public async Task<Shop> InsertEmployee(Shop objEmployee)
        {
            _appDBContext.EmployeeAngulars.Add(objEmployee);
            await _appDBContext.SaveChangesAsync();
            return objEmployee;
        }

        public async Task<Shop> UpdateEmployee(Shop objEmployee)
        {
            _appDBContext.Entry(objEmployee).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return objEmployee;
        }

        public bool DeleteEmployee(int ID)
        {
            bool result = false;
            var department = _appDBContext.EmployeeAngulars.Find(ID);
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

