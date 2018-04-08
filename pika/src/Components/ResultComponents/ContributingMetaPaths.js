import React, { Component } from 'react';
import { render } from 'react-dom'
import { ResponsivePie } from '@nivo/pie'

class ContributingMetaPaths extends Component {

    render(){
        return(
            <ResponsivePie
                data={this.props.metaPathData}
                margin={{
                    "top": 40,
                    "right": 80,
                    "bottom": 80,
                    "left": 80
                }}
                sortByValue={true}
                innerRadius={0.5}
                padAngle={0.7}
                colors="d320c"
                colorBy="id"
                borderColor="inherit:darker(0.6)"
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor="inherit"
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "bottom",
                        "direction": "row",
                        "translateY": 56,
                        "itemWidth": 100,
                        "itemHeight": 14,
                        "symbolSize": 14,
                        "symbolShape": "circle"
                    }
                ]}
            />
        );
    }
}

export default ContributingMetaPaths;