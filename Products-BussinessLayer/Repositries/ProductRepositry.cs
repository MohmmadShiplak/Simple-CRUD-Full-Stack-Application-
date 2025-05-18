
using Products_DataAccessLayer;
using Products_DataAccessLayer.Interfaces;
using System.Linq.Expressions;

namespace Products_BussinessLayer
{
    public class ProductRepositry<T> : IProductRepositry<T> where T : class
    {

        protected ApplicationDbContext _Context;


            public ProductRepositry(ApplicationDbContext context)
        {
            _Context= context;  
        }

        public T Add(T entity)
        {
          _Context.Set<T>().Add(entity);
            _Context.SaveChanges();
            return entity;  
        }

        public IEnumerable<T> AddRange(IEnumerable<T> entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(T entity)
        {
            _Context.Set<T>().Remove(entity);
            _Context.SaveChanges();
        }

        public T Find(Expression<Func<T, bool>> match)
        {
            return _Context.Set<T>().SingleOrDefault(match);
        }

        public IEnumerable<T> GetAll()
        {
          return _Context.Set<T>().ToList();
        }

        public T GetById(int Id)
        {
            return _Context.Set<T>().Find(Id);
        }

        public T Update(T entity)
        {
            _Context.Set<T>().Update(entity);
            _Context.SaveChanges();
            return entity;
        }
    }
}
