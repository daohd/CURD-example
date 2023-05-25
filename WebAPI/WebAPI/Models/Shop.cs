using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    [Table("Shop")]
    public class Shop
    {
        [Key]
        public int ShopId { get; set; }
        public string ShopName { get; set; }
        public string Location { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
