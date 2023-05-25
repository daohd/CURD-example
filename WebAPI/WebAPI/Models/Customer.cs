using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Customer")]

    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [StringLength(100)]
        public string FullName { get; set; }

        public DateTime DOB { get; set; }
        [StringLength(240)]
        public string Email { get; set; }
        public virtual ICollection<Order> Purchases { get; set; } = new List<Order>();
    }
}
