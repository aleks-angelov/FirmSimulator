using FirmSimulator.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace FirmSimulator.Controllers
{
    [Route("api/[controller]")]
    public class ChartsController : Controller
    {
        // GET api/charts/5
        [HttpGet("{id}")]
        public ChartData Get(int id)
        {
            return ChartDataFactory.GetChartData(id);
        }
    }
}