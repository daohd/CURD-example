using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Product")]

    public class Product: ProductInput
    {
        [Key]
        public int ProductId { get; set; }
        public Shop Shop { get; set; }
       
        public virtual ICollection<Order> Purchases { get; set; } = new List<Order>();

    }

    public class ProductInput
    {
        [StringLength(250)]
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int ShopId { get; set; }
    }
}
