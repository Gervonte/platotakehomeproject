import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 99%;
	height: 100vh;
	border: 4px solid;
	margin: 5px;
`;

export const CalendarHead = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 24px;
`;

export const SevenColGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	height: 25px;
`;

export const HeadDay = styled.span`
	border: 2px solid;
	text-align: center;
	font-size: 1.2rem;
`;

export const CalendarBody = styled.div`
	height: calc(100% - 25px - 40px);
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(${({ fourCol }) => (fourCol ? 5 : 5)}, 1fr);
	background-color: gray;
`;

export const StyledDay = styled.span`
	border: 2px solid;
	text-align: left;
	padding: 3px;
	background-color: white;
	${({ active }) => active && `background: darkgray`}
`;

export const StyledEvent = styled.span`
	display: grid;
	text-align: left;
	background: ${({ bgColor }) => bgColor || 'darkBlue'};
	color: white;
	padding: 2px 7px;
	border-radius: 6px;
`;

export const getRandomDarkColor = () => {
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += Math.floor(Math.random() * 10);
	}
	return color;
};
