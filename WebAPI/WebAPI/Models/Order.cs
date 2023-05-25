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
        public Customer Customer { get; set; }

        public ICollection<Product> Products { get; set; }
        public DateTime CreateDate { get; set; }

    }
}
