using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Order")]

    public class Order
    {
        [Key]
        public int OrderID { get; set; }

        public int CustomerId { get; set; }

        public int ProductId { get; set; }
        public virtual Customer Customer { get; set; } = null!;

        public virtual Product Product { get; set; } = null!;
        public DateTime CreateDate { get; set; } = DateTime.Now;

    }

    public class OrderInput
    {
        public int CustomerId { get; set; }
        public int ProductId { get; set; }

        //public List<Product> lstProduct {get;set;}
    }

    public class OrderOutPut
    {
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string ShopName { get; set; }

        //public List<Product> lstProduct {get;set;}
    }
}
