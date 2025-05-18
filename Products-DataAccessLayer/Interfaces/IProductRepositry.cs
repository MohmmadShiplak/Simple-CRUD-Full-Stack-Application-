using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Products_DataAccessLayer.Interfaces
{
    public interface IProductRepositry<T> where T : class
    {

      T GetById(int Id);

        IEnumerable<T> GetAll();

        T Find(Expression<Func<T,bool>>match);

        T Add(T entity);

        IEnumerable<T> AddRange(IEnumerable<T> entity);

        T Update(T entity);

        void Delete(T entity);
    }
}
