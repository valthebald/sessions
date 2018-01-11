const FilterForm = (props) => {
  return (
      <div><label for="name">Filter</label><input name="filter"/></div>
  )
};

function StockItem(props) {
      var class_name;
      var data = props.data;
      if (data.change < 0) {
          class_name = "negative"
      }
      else if (data.change > 0) {
          class_name = "positive"
      }
      else {
          class_name = "nochange"
      }
      if (data.change != 0) {
          class_name += " fresh"
      }
      class_name += " " + (props.index % 2 ? "odd" : "even");
      return (
          <tr className={class_name}>
              <td>{data.code}</td>
              <td>{data.name}</td>
              <td>{Math.round(data.price*100)/100}</td>
              <td>{Math.round(data.change*100)/100}</td>
          </tr>
      )
};

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shares: [
                {code: 'AMZN', name: 'Amazon', price: 1254.33, change:0 },
                {code: 'FB', name: 'Facebook', price: 187.04, change:0 },
                {code: 'GOOG', name: 'Google', price: 1102.61, change:0 },
                {code: 'MSFT', name: 'Microsoft', price: 87.82, change:0 }
            ]
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.update(),
            5000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    update() {
        var newshares = this.state.shares;
        // Randomly change stock price. Could be AJAX call to real stock API.
        newshares.map(function (item) {
            // Change probability is 30%, item price can remain still.
            // Max single change is 1%
            item.change = 0;
            if (Math.random() > 0.7) {
                item.change = (Math.random()*2 - 1) * item.price / 100;
                item.price = item.price + item.change;
            }
        })
        this.setState({"shares": newshares});
    }
    render() {
        return (
            <div className="stocks">
                <FilterForm/>
                <table>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                    </tr>
                {
                    this.state.shares.map(function (share, index) {
                        return (
                            <StockItem data={share} index={index}/>
                        )
                    })
                }
                </table>
            </div>
        )
    }
}

ReactDOM.render(
<Stock />,
    document.getElementById('stocks')
);