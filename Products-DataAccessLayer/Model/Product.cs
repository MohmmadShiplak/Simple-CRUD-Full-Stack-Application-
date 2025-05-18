using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace Products_DataAccessLayer.Model
{
    public class Product
    {
        public int id { get; set; }

        public string Name { get; set; }


        public decimal Price { get; set; }


    }
}
