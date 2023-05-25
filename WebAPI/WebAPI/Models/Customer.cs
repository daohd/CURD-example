using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Customer")]

    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string FullName { get; set; }

        public DateTime DOB { get; set; }
        public string Email { get; set; }
    }
}
