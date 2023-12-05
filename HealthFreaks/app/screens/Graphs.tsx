import React from 'react'
import { ScrollView, StatusBar, Dimensions, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { BarChart, LineChart, ProgressChart } from 'react-native-chart-kit'


export default class App extends React.Component {
    renderTabBar() {
        return <StatusBar hidden />
    }
    render() {
        const data = {
            labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
            datasets: [{
                data: [50, 45, 60],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // change dot color
            }, {
                data: [10]
            }, {
                data: [20]
            }]
        }
        const progressChartData = [0.5, 0.6, 0.9]
        const width = Dimensions.get('window').width
        const height = 250
        return (
            <ScrollableTabView renderTabBar={this.renderTabBar}>
                {chartConfigs.map(chartConfig => {
                    const labelStyle = {
                        color: chartConfig.color(),
                        marginVertical: 10,
                        textAlign: 'center',
                        fontSize: 20
                    }
                    const graphStyle = {
                        marginVertical: 20,
                        ...chartConfig.style
                    }

                    return (
                        <ScrollView
                            key={Math.random()}
                            style={{ backgroundColor: chartConfig.backgroundColor }}
                        >
                            <LineChart
                                data={data}
                                width={width}
                                height={height}
                                chartConfig={chartConfig}
                                bezier
                                style={graphStyle}
                            />
                            <ProgressChart
                                data={progressChartData}
                                width={width}
                                height={height}
                                chartConfig={chartConfig}
                                style={graphStyle}
                            />
                            <BarChart
                                data={data}
                                width={width}
                                height={height}
                                chartConfig={chartConfig}
                                style={graphStyle}
                            />
                        </ScrollView>
                    )
                })}
            </ScrollableTabView>
        )
    }
}

// swipe left or right to see different styles 
const chartConfigs = [
    //green w/ black theme
    {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    //all blue theme
    {
        backgroundColor: '#022173',
        backgroundGradientFrom: '#022173',
        backgroundGradientTo: '#1b3fa0',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    //white theme 
    /*{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    },
    //green w/ light green theme
    {
        backgroundColor: '#26872a',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },*/
    //black and white theme 
    {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#000000',
        backgroundGradientTo: '#000000',
        color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
    },
    /*
    // light blue theme 
    {
        backgroundColor: '#0091EA',
        backgroundGradientFrom: '#0091EA',
        backgroundGradientTo: '#0091EA',
        color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
    },*/
    // orange theme 
    {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    // red theme
    {
        backgroundColor: '#b90602',
        backgroundGradientFrom: '#e53935',
        backgroundGradientTo: '#ef5350',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    /*
    //all orange theme
    {
        backgroundColor: '#ff3e03',
        backgroundGradientFrom: '#ff3e03',
        backgroundGradientTo: '#ff3e03',
        color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
    }
    */
]
