import Store from "../db/Store";
import SaleLog from "../db/SaleLog";

// cronjob을 이용한 매년 1월 1일 1초에 실시되는 매출리스트를 검색하여 마지막 미수금액을 기준으로 전잔금을 기록한다.
// 거래처 기준은 소매점을 기준으로 검색한다.
const remainderUpdate = async () => {
  try {
    // 등록된 소매점들을 모두 찾는다.
    const stores = await Store.find({ corp_type: "A" });

    if (stores) {
      stores.forEach(async store => {
        // 잔금(현재 연도 이월금액이 입력이 되어 있는지 검색)
        const currentYear = new Date().getFullYear();

        let existsYear = false;
        let remainIndex = -1;

        store.remainder.forEach((remainObj, i) => {
          if (remainObj.year && remainObj.year === currentYear) {
            remainIndex = i;
            existsYear = true;
          }
        });

        if (!existsYear) {
          const lastRemainder: number = await SaleLog.getRemainderPerLastYear(
            store.id,
            currentYear - 1
          );

          store.remainder.push({
            year: currentYear,
            remain_money: lastRemainder,
          });

          await store.save();
        }
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default remainderUpdate;
