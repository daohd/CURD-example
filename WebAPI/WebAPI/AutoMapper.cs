using AutoMapper;
using WebAPI.Models;

namespace WebAPI
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<CustomerInput, Customer>();
            CreateMap<ShopInput, Shop>();
            CreateMap<ProductInput, Product>();
            CreateMap<OrderInput, Order>();
        }
    }
}
