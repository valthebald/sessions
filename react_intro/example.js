const FilterForm = (props) => {
  return (
      <div><label for="name">Filter</label><input name="filter"/></div>
  )
};

class StockItem extends React.Component {
  render() {
      var class_name;
      var data = this.props.data;
      if (data.change < 0) {
          class_name = "negative"
      }
      else if (data.change > 0) {
          class_name = "positive"
      }
      else {
          class_name = "nochange"
      }
      return (
          <div className={class_name}>
              {data.code} {data.name}
          </div>
      )
  }
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
            10000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    update() {
        this.setState({"shares": shares});
    }
    render() {
        console.log('render');
        return (
            <div className="stocks">
                <FilterForm/>
                {
                    this.state.shares.map(function (share) {
                        return (
                            <StockItem data={share}/>
                        )
                    })
                }
            </div>
        )
    }
}

ReactDOM.render(
<Stock />,
    document.getElementById('stocks')
);