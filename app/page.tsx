"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Category = "鲜果" | "水鲜" | "蔬食" | "节令";

type Food = {
  id: string;
  name: string;
  category: Category;
  start: number;
  peakStart: number;
  peakEnd: number;
  end: number;
  cardAt: number;
  track: number;
  cardLane: 0 | 1;
  window: string;
  place: string;
  note: string;
  choose: string;
  source: string;
  sourceUrl?: string;
  sourceDate: string;
  art: number;
  artSrc?: string;
};

const MONTHS = [
  { n: "一", en: "JAN", terms: [{ name: "小寒", day: 5 }, { name: "大寒", day: 20 }] },
  { n: "二", en: "FEB", terms: [{ name: "立春", day: 4 }, { name: "雨水", day: 19 }] },
  { n: "三", en: "MAR", terms: [{ name: "惊蛰", day: 5 }, { name: "春分", day: 20 }] },
  { n: "四", en: "APR", terms: [{ name: "清明", day: 5 }, { name: "谷雨", day: 20 }] },
  { n: "五", en: "MAY", terms: [{ name: "立夏", day: 5 }, { name: "小满", day: 21 }] },
  { n: "六", en: "JUN", terms: [{ name: "芒种", day: 5 }, { name: "夏至", day: 21 }] },
  { n: "七", en: "JUL", terms: [{ name: "小暑", day: 7 }, { name: "大暑", day: 23 }] },
  { n: "八", en: "AUG", terms: [{ name: "立秋", day: 7 }, { name: "处暑", day: 23 }] },
  { n: "九", en: "SEP", terms: [{ name: "白露", day: 7 }, { name: "秋分", day: 23 }] },
  { n: "十", en: "OCT", terms: [{ name: "寒露", day: 8 }, { name: "霜降", day: 23 }] },
  { n: "十一", en: "NOV", terms: [{ name: "立冬", day: 7 }, { name: "小雪", day: 22 }] },
  { n: "十二", en: "DEC", terms: [{ name: "大雪", day: 7 }, { name: "冬至", day: 21 }] },
];

const FOODS: Food[] = [
  {
    id: "winter-bamboo",
    name: "冬笋",
    category: "蔬食",
    start: 10.72,
    peakStart: 11.15,
    peakEnd: 12.75,
    end: 13.82,
    cardAt: 12.13,
    track: 0,
    cardLane: 0,
    window: "11月下旬 — 2月",
    place: "苏州近郊及江浙竹区",
    note: "脆嫩清甜，是腌笃鲜与油焖笋里安静的鲜味。",
    choose: "笋壳紧实、根部洁白，拿在手里沉而不空。",
    source: "常年节令参考",
    sourceDate: "待当季报道校准",
    art: 1,
  },
  {
    id: "taihu-whitefish",
    name: "太湖白鱼",
    category: "水鲜",
    start: 1.72,
    peakStart: 2.05,
    peakEnd: 3.6,
    end: 4.78,
    cardAt: 1.95,
    track: 1,
    cardLane: 1,
    window: "2月下旬 — 5月",
    place: "太湖流域",
    note: "肉质细嫩，清蒸最能留住湖鲜本味。",
    choose: "鱼身银亮、鳞片完整，鱼眼清澈有神。",
    source: "常年节令参考",
    sourceDate: "待当季报道校准",
    art: 5,
  },
  {
    id: "biluochun",
    name: "洞庭山碧螺春",
    category: "节令",
    start: 2.42,
    peakStart: 2.58,
    peakEnd: 2.96,
    end: 3.2,
    cardAt: 2.42,
    track: 2,
    cardLane: 0,
    window: "3月中旬 — 4月上旬",
    place: "吴中区东山、金庭",
    note: "春分前后采下新芽，花果香藏在卷曲的嫩叶里。",
    choose: "条索纤细、卷曲成螺，茸毛显、香气清鲜。",
    source: "常年节令参考",
    sourceDate: "待春茶报道校准",
    art: 0,
  },
  {
    id: "malantou",
    name: "马兰头",
    category: "蔬食",
    start: 1.78,
    peakStart: 2.05,
    peakEnd: 2.72,
    end: 3.15,
    cardAt: 2.18,
    track: 3,
    cardLane: 1,
    window: "2月下旬 — 4月上旬",
    place: "苏州本地菜场与近郊菜园",
    note: "带着清鲜微涩的野蔬香，春日里拌香干最见苏州味。",
    choose: "嫩茎短、叶色鲜绿，叶片完整且没有发黄萎蔫。",
    source: "苏州市农业农村局 · 时令报道",
    sourceUrl: "https://nyncj.suzhou.gov.cn/nlj/zwyw/202402/be99a7cc4981489b968e0909bbce1adf.shtml",
    sourceDate: "2024.02 参考",
    art: 2,
    artSrc: "./food-malantou.png",
  },
  {
    id: "xiangchun",
    name: "香椿",
    category: "蔬食",
    start: 2.42,
    peakStart: 2.62,
    peakEnd: 3.12,
    end: 3.45,
    cardAt: 2.72,
    track: 4,
    cardLane: 0,
    window: "3月中旬 — 4月中旬",
    place: "苏州本地菜场与近郊菜园",
    note: "嫩芽带着独特辛香，焯水后拌豆腐或炒蛋最宜。",
    choose: "芽梗短壮、红褐鲜亮，闻起来有清楚的香椿气。",
    source: "苏州市农业农村局 · 时令报道",
    sourceUrl: "https://nyncj.suzhou.gov.cn/nlj/zwyw/202402/be99a7cc4981489b968e0909bbce1adf.shtml",
    sourceDate: "2024.02 参考",
    art: 2,
    artSrc: "./food-xiangchun.png",
  },
  {
    id: "loquat",
    name: "东山白沙枇杷",
    category: "鲜果",
    start: 4.12,
    peakStart: 4.45,
    peakEnd: 4.9,
    end: 5.12,
    cardAt: 4.4,
    track: 0,
    cardLane: 0,
    window: "5月上旬 — 6月初",
    place: "吴中区东山镇",
    note: "果肉洁白，皮薄汁丰，是小满前后最轻盈的一口甜。",
    choose: "绒毛完整、果皮鹅黄，轻捏有弹性且没有碰伤。",
    source: "苏州市人民政府 · 产区报道",
    sourceUrl: "https://www.suzhou.gov.cn/szsrmzf/szyw/202606/4aaa371b58604f24ac9a376335d60912.shtml",
    sourceDate: "2026.06 校准",
    art: 3,
  },
  {
    id: "bayberry",
    name: "吴中杨梅",
    category: "鲜果",
    start: 5.28,
    peakStart: 5.42,
    peakEnd: 5.7,
    end: 5.86,
    cardAt: 5.38,
    track: 1,
    cardLane: 1,
    window: "6月10日 — 6月下旬",
    place: "东山、金庭及苏州各产区",
    note: "乌紫饱满、汁水充沛，酸甜是太湖初夏的醒神一笔。",
    choose: "颜色深红至乌紫，果刺饱满、闻起来有自然果香。",
    source: "苏州市农业农村局 · 当年预报",
    sourceUrl: "https://nyncj.suzhou.gov.cn/nlj/zwyw/202606/0a793e1c57f4405591c69a49b00235c8.shtml",
    sourceDate: "2026.06 校准",
    art: 4,
  },
  {
    id: "gorgon-fruit",
    name: "鸡头米",
    category: "水鲜",
    start: 6.82,
    peakStart: 7.2,
    peakEnd: 8.72,
    end: 9.42,
    cardAt: 7.15,
    track: 0,
    cardLane: 0,
    window: "7月下旬 — 10月",
    place: "吴中区车坊一带",
    note: "手剥鲜粒莹润弹糯，一碗糖水就足够有江南气。",
    choose: "鲜粒乳白饱满、大小均匀，没有明显黄斑和异味。",
    source: "苏州市农业农村局 · 产地报道",
    sourceUrl: "https://nyncj.suzhou.gov.cn/nlj/zwyw/202507/dc425d34bb304ba68bc39b7a2b255ae0.shtml",
    sourceDate: "2025.07 校准",
    art: 6,
  },
  {
    id: "lotus-root",
    name: "鲜藕",
    category: "蔬食",
    start: 7.02,
    peakStart: 7.42,
    peakEnd: 8.55,
    end: 9.52,
    cardAt: 7.72,
    track: 1,
    cardLane: 1,
    window: "8月 — 10月",
    place: "苏州水乡塘浦",
    note: "初秋嫩藕爽脆，入汤后又会慢慢变得粉糯。",
    choose: "藕节完整、表皮淡黄，切口新鲜且没有发黑。",
    source: "常年节令参考",
    sourceDate: "待当季报道校准",
    art: 7,
  },
  {
    id: "water-caltrop",
    name: "红菱",
    category: "蔬食",
    start: 7.82,
    peakStart: 8.15,
    peakEnd: 9.02,
    end: 9.48,
    cardAt: 8.38,
    track: 2,
    cardLane: 0,
    window: "8月下旬 — 10月",
    place: "苏州水乡河浜",
    note: "嫩时脆甜，老时粉糯，是水八仙里最有棱角的一味。",
    choose: "外壳红褐有光泽，捏起来饱满硬实、没有虫孔。",
    source: "常年节令参考",
    sourceDate: "待当季报道校准",
    art: 8,
  },
  {
    id: "cuiguan-pear",
    name: "翠冠梨",
    category: "鲜果",
    start: 6.42,
    peakStart: 6.62,
    peakEnd: 6.92,
    end: 7.15,
    cardAt: 6.68,
    track: 4,
    cardLane: 1,
    window: "7月中旬 — 8月上旬",
    place: "苏州地产梨园",
    note: "果皮青黄、肉质细脆，盛夏里咬下去汁水丰盈。",
    choose: "果形端正、表皮细润，拿在手里沉实且没有碰伤。",
    source: "苏州市人民政府 · 时令报道",
    sourceUrl: "https://www.suzhou.gov.cn/szsrmzf/fmqc/202607/b067448938304c829304c217f36162a3.shtml",
    sourceDate: "2026.07 校准",
    art: 10,
    artSrc: "./food-cuiguan-pear.png",
  },
  {
    id: "hairy-crab",
    name: "阳澄湖大闸蟹",
    category: "水鲜",
    start: 8.82,
    peakStart: 9.28,
    peakEnd: 10.55,
    end: 11.55,
    cardAt: 9.68,
    track: 4,
    cardLane: 0,
    window: "9月下旬 — 12月",
    place: "阳澄湖及沿湖高标准养殖区",
    note: "秋风一起，蟹黄与蟹膏渐丰，清蒸便是最郑重的吃法。",
    choose: "青背白肚、金爪黄毛，提起时腿脚有力、分量压手。",
    source: "苏州市人民政府 · 开捕信息",
    sourceUrl: "https://www.suzhou.gov.cn/szsrmzf/xdny/202509/bda9fd7dab5d4e9d9268fb81f236e6da.shtml",
    sourceDate: "2025.09 校准",
    art: 9,
  },
  {
    id: "winter-wine",
    name: "冬酿酒",
    category: "节令",
    start: 10.7,
    peakStart: 11.35,
    peakEnd: 11.68,
    end: 11.86,
    cardAt: 11.18,
    track: 2,
    cardLane: 1,
    window: "冬至前约一月",
    place: "苏州各老字号与传统酒坊",
    note: "清甜米酒里浮着桂花，只有入冬后这一小段时间才惦记。",
    choose: "酒液清亮、桂花香自然，开封后冷藏并尽快饮用。",
    source: "传统节俗时间",
    sourceDate: "随冬至节令更新",
    art: 11,
  },
];

function artPosition(index: number) {
  const col = index % 4;
  const row = Math.floor(index / 4);
  return `${(col / 3) * 100}% ${(row / 2) * 100}%`;
}

function artStyle(food: Food): CSSProperties {
  if (food.artSrc) {
    return {
      backgroundImage: `url("${food.artSrc}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
  }

  return { backgroundPosition: artPosition(food.art) };
}

function termForToday(month: number, day: number) {
  const terms = MONTHS[month].terms;
  return day >= terms[1].day ? terms[1].name : terms[0].name;
}

function rangeStyle(food: Food) {
  const trackX = 38 + food.track * 5.9;
  const cardLeft = 74;
  return {
    "--range-top": `${(food.start / 12) * 100}%`,
    "--range-height": `${((food.end - food.start) / 12) * 100}%`,
    "--peak-start": `${((food.peakStart - food.start) / (food.end - food.start)) * 100}%`,
    "--peak-span": `${((food.peakEnd - food.peakStart) / (food.end - food.start)) * 100}%`,
    "--card-at": `${((food.cardAt - food.start) / (food.end - food.start)) * 100}%`,
    "--track-x": `${trackX}%`,
    "--card-left": `${cardLeft}%`,
    "--link-left": `${trackX}%`,
    "--link-width": `${cardLeft - trackX}%`,
  } as CSSProperties;
}

export default function Home() {
  const now = useMemo(() => new Date(), []);
  const currentMonth = now.getMonth();
  const [activeMonth, setActiveMonth] = useState(currentMonth);
  const [selected, setSelected] = useState<Food | null>(null);
  const [timelineScrolling, setTimelineScrolling] = useState(false);
  const [showMonthEcho, setShowMonthEcho] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cycleHeightRef = useRef(0);
  const isRepositioning = useRef(false);
  const scrollIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardFrameRef = useRef<number | null>(null);
  const cardSelectionRef = useRef<Set<string>>(new Set());

  const visibleFoods = FOODS;

  const positionCards = (refreshSelection = false) => {
    if (cardFrameRef.current !== null) return;

    cardFrameRef.current = requestAnimationFrame(() => {
      cardFrameRef.current = null;
      const scroller = scrollerRef.current;
      const cycle = cycleHeightRef.current;
      if (!scroller || !cycle) return;

      const rootStyles = getComputedStyle(document.documentElement);
      const headerHeight = Number.parseFloat(rootStyles.getPropertyValue("--header-h")) || 82;
      const gap = window.innerWidth <= 820 ? 14 : 18;

      const entries = Array.from(scroller.querySelectorAll<HTMLElement>(".season-range")).flatMap((range) => {
        const foodIndex = Number(range.dataset.foodIndex);
        const cycleIndex = Number(range.dataset.cycle);
        const food = visibleFoods[foodIndex];
        const card = range.querySelector<HTMLElement>(".range-card");
        if (!food || !card || !Number.isFinite(cycleIndex)) return [];

        const cachedHeight = Number.parseFloat(range.dataset.cardHeight ?? "");
        const cardHeight = Number.isFinite(cachedHeight) ? cachedHeight : card.offsetHeight;
        if (!Number.isFinite(cachedHeight)) range.dataset.cardHeight = String(cardHeight);
        const rangeStart = cycleIndex * cycle + (food.start / 12) * cycle;
        const peakStart = cycleIndex * cycle + (food.peakStart / 12) * cycle;
        const peakEnd = cycleIndex * cycle + (food.peakEnd / 12) * cycle;
        const rangeEnd = cycleIndex * cycle + (food.end / 12) * cycle;

        return [{
          key: `${cycleIndex}:${foodIndex}`,
          range,
          cardHeight,
          rangeStart,
          peakStart,
          peakEnd,
          rangeEnd,
        }];
      });

      const viewportTop = headerHeight;
      const viewportBottom = scroller.clientHeight - 24;
      const focusTime = scroller.scrollTop + scroller.clientHeight * 0.42;
      type Entry = (typeof entries)[number];
      type Placement = { entry: Entry; center: number };

      const boundsFor = (entry: Entry) => ({
        min: Math.max(
          entry.rangeStart - scroller.scrollTop,
          viewportTop - entry.cardHeight * 0.28,
        ),
        max: Math.min(
          entry.rangeEnd - scroller.scrollTop,
          viewportBottom + entry.cardHeight * 0.28,
        ),
      });

      const layoutCards = (items: Entry[]): Placement[] | null => {
        const ordered = [...items].sort((a, b) => (
          a.rangeStart - b.rangeStart || a.rangeEnd - b.rangeEnd
        ));
        const placements: Placement[] = [];

        for (const entry of ordered) {
          const bounds = boundsFor(entry);
          const previous = placements.at(-1);
          const earliest = previous
            ? previous.center + previous.entry.cardHeight / 2 + entry.cardHeight / 2 + gap
            : bounds.min;
          const center = Math.max(bounds.min, earliest);
          if (center > bounds.max) return null;
          placements.push({ entry, center });
        }

        if (!placements.length) return placements;
        const first = placements[0];
        const desiredFirstCenter = viewportTop + 14 + first.entry.cardHeight / 2;
        const availableShift = Math.min(...placements.map(({ entry, center }) => (
          boundsFor(entry).max - center
        )));
        const shift = Math.max(0, Math.min(desiredFirstCenter - first.center, availableShift));
        return placements.map(({ entry, center }) => ({ entry, center: center + shift }));
      };

      const displayPriority = (entry: Entry) => {
        if (focusTime >= entry.peakStart && focusTime <= entry.peakEnd) {
          return [0, focusTime - entry.peakStart];
        }
        if (focusTime >= entry.rangeStart && focusTime < entry.peakStart) {
          return [1, focusTime - entry.rangeStart];
        }
        if (focusTime > entry.peakEnd && focusTime <= entry.rangeEnd) {
          return [2, entry.rangeEnd - focusTime];
        }
        return [3, Math.min(
          Math.abs(focusTime - entry.rangeStart),
          Math.abs(focusTime - entry.rangeEnd),
        )];
      };

      const candidates = entries
        .filter((entry) => {
          const bounds = boundsFor(entry);
          return bounds.max >= bounds.min;
        })
        .sort((a, b) => {
          const aPriority = displayPriority(a);
          const bPriority = displayPriority(b);
          return aPriority[0] - bPriority[0]
            || aPriority[1] - bPriority[1]
            || a.rangeStart - b.rangeStart;
        });
      let placements: Placement[] = [];
      if (refreshSelection || cardSelectionRef.current.size === 0) {
        const selectedEntries: Entry[] = [];
        candidates.forEach((entry) => {
          const attempt = layoutCards([...selectedEntries, entry]);
          if (!attempt) return;
          selectedEntries.push(entry);
          placements = attempt;
        });
        cardSelectionRef.current = new Set(selectedEntries.map((entry) => entry.key));
      } else {
        const stableEntries = candidates
          .filter((entry) => cardSelectionRef.current.has(entry.key))
          .sort((a, b) => a.rangeStart - b.rangeStart || a.rangeEnd - b.rangeEnd);
        const stillFitting: Entry[] = [];
        stableEntries.forEach((entry) => {
          const attempt = layoutCards([...stillFitting, entry]);
          if (!attempt) return;
          stillFitting.push(entry);
          placements = attempt;
        });
      }
      const placementByRange = new Map(placements.map((placement) => [
        placement.entry.range,
        placement.center,
      ]));

      entries.forEach((entry) => {
        const { range, cardHeight, rangeStart, rangeEnd } = entry;
        const placedCenter = placementByRange.get(range);
        const fallbackCenter = Math.min(
          Math.max(focusTime - scroller.scrollTop, rangeStart - scroller.scrollTop),
          rangeEnd - scroller.scrollTop,
        );
        const center = placedCenter ?? fallbackCenter;
        const top = center - cardHeight / 2;
        const bottom = center + cardHeight / 2;
        const visiblePixels = Math.max(
          0,
          Math.min(bottom, viewportBottom) - Math.max(top, viewportTop),
        );
        const visibleRatio = visiblePixels / cardHeight;
        const opacity = placedCenter === undefined
          ? 0
          : Math.min(1, Math.max(0, (visibleRatio - 0.08) / 0.72));
        const centerWithinRange = scroller.scrollTop + center - rangeStart;

        range.style.setProperty("--card-y", `${centerWithinRange}px`);
        range.style.setProperty("--card-opacity", opacity.toFixed(3));
        range.classList.toggle("card-hidden", opacity < 0.08);
      });
    });
  };

  const goToNow = (smooth = true) => {
    const scroller = scrollerRef.current;
    const cycle = cycleHeightRef.current;
    if (!scroller || !cycle) return;

    const monthHeight = cycle / 12;
    const daysInMonth = new Date(now.getFullYear(), currentMonth + 1, 0).getDate();
    const dayProgress = Math.min((now.getDate() - 1) / daysInMonth, 0.97);
    const target = cycle + (currentMonth + dayProgress) * monthHeight - scroller.clientHeight * 0.42;
    const shouldAnimate = smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
    scroller.classList.add("is-returning");
    scroller.scrollTo({
      top: target,
      behavior: shouldAnimate ? "smooth" : "auto",
    });
    positionCards(!shouldAnimate);

    returnTimerRef.current = setTimeout(() => {
      scroller.classList.remove("is-returning");
      positionCards(true);
    }, shouldAnimate ? 900 : 40);
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const setDimensions = () => {
      const firstMonth = scroller.querySelector<HTMLElement>("[data-month]");
      if (!firstMonth) return;
      scroller.querySelectorAll<HTMLElement>(".season-range").forEach((range) => {
        delete range.dataset.cardHeight;
      });
      cycleHeightRef.current = firstMonth.offsetHeight * 12;
      goToNow(false);
      positionCards(true);
    };

    const frame = requestAnimationFrame(setDimensions);
    window.addEventListener("resize", setDimensions);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", setDimensions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.classList.add("detail-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("detail-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  useEffect(() => {
    return () => {
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
      if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
      if (cardFrameRef.current !== null) cancelAnimationFrame(cardFrameRef.current);
    };
  }, []);

  const onScroll = () => {
    const scroller = scrollerRef.current;
    const cycle = cycleHeightRef.current;
    if (!scroller || !cycle || isRepositioning.current) return;

    setTimelineScrolling(true);
    setShowMonthEcho(false);

    if (scroller.scrollTop < cycle * 0.5) {
      isRepositioning.current = true;
      scroller.scrollTop += cycle;
      requestAnimationFrame(() => (isRepositioning.current = false));
    } else if (scroller.scrollTop > cycle * 2.5) {
      isRepositioning.current = true;
      scroller.scrollTop -= cycle;
      requestAnimationFrame(() => (isRepositioning.current = false));
    }

    const monthHeight = cycle / 12;
    const focusPosition = scroller.scrollTop + scroller.clientHeight * 0.28;
    const focusedMonth = Math.floor(focusPosition / monthHeight);
    const withinCycle = ((focusPosition % cycle) + cycle) % cycle;
    const monthTopInView = focusedMonth * monthHeight - scroller.scrollTop;
    const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 82;
    const monthLabelIsObscured = monthTopInView + 4 < headerHeight;

    setActiveMonth(Math.floor(withinCycle / monthHeight));
    positionCards(false);
    if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
    scrollIdleRef.current = setTimeout(() => {
      setTimelineScrolling(false);
      setShowMonthEcho(monthLabelIsObscured);
      positionCards(true);
    }, 220);
  };

  return (
    <main className={`site-shell${timelineScrolling ? " timeline-scrolling" : ""}`}>
      <header className="site-header">
        <button className="brand" type="button" onClick={() => goToNow()} aria-label="回到此刻">
          <span className="brand-mark">蘇</span>
          <span>
            <strong>不时不食</strong>
            <small>苏州时令风物志</small>
          </span>
        </button>

        <div className="today" aria-live="polite">
          <strong>{termForToday(currentMonth, now.getDate())}</strong>
        </div>

        <button className="back-now top-now" onClick={() => goToNow()}>
          回到此刻
          <span aria-hidden="true">↓</span>
        </button>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">A TASTE OF SUZHOU · 一年一会</p>
        <h1>
          一口知时，
          <br />
          一味知苏州。
        </h1>
        <p className="intro-copy">
          顺着节气上下游走，看看水乡的鲜果、湖鲜与点心，何时来到最好的一刻。
        </p>
      </section>

      <section className="timeline-wrap" aria-label="全年时令时间轴">
        <div className={`month-tick month-indicator${showMonthEcho ? " is-visible" : ""}`} aria-hidden="true">
          <span className="month-dot month-indicator-dot" />
          <div className="month-name">
            <strong>{MONTHS[activeMonth].n}月</strong>
            <small>{MONTHS[activeMonth].en}</small>
          </div>
        </div>

        <div className="range-legend" aria-label="色带图例">
          <span><i className="legend-soft" />初上市与尾季</span>
          <span><i className="legend-peak" />最佳赏味</span>
        </div>

        <div className="timeline" ref={scrollerRef} onScroll={onScroll}>
          {[0, 1, 2].map((cycle) => (
            <div className="year-cycle" key={cycle}>
              <div className="calendar-layer">
                {MONTHS.map((month, index) => (
                  <section
                    className={`month-section${showMonthEcho && index === activeMonth ? " month-echo-source-hidden" : ""}`}
                    data-month={index}
                    key={index}
                    aria-label={`${month.n}月，${month.terms.map((term) => term.name).join("、")}`}
                  >
                    <div className="month-tick">
                      <span className="month-dot" />
                      <div className="month-name">
                        <strong>{month.n}月</strong>
                        <small>{month.en}</small>
                      </div>
                    </div>

                    {month.terms.map((term) => (
                      <div
                        className="solar-tick"
                        style={{ top: `${(term.day / 31) * 100}%` }}
                        key={term.name}
                      >
                        <span className="solar-mark" />
                        <span className="solar-name">{term.name}</span>
                        <small>{String(term.day).padStart(2, "0")}</small>
                      </div>
                    ))}
                  </section>
                ))}
              </div>

              <div className="range-layer">
                {visibleFoods.map((food, foodIndex) => (
                  <div
                    className={`season-range tone-${food.category} track-${food.track}`}
                    style={rangeStyle(food)}
                    data-cycle={cycle}
                    data-food-index={foodIndex}
                    key={food.id}
                  >
                    <span className="range-link" aria-hidden="true" />
                    <button
                      className="season-band"
                      onClick={() => setSelected(food)}
                      aria-label={`${food.name}，上市时间${food.window}`}
                    >
                      <span className="band-line" />
                      <span className="band-peak" />
                      <span className="band-start" />
                      <span className="band-end" />
                    </button>

                    <button
                      className="range-card"
                      onClick={() => setSelected(food)}
                      aria-label={`查看${food.name}详情`}
                    >
                      <span
                        className="range-art"
                        style={artStyle(food)}
                        aria-hidden="true"
                      />
                      <span className="range-copy">
                        <strong>{food.name}</strong>
                        <span className="range-window">
                          <span className="listing-label">上市时间</span>
                          <b>{food.window}</b>
                        </span>
                        <span className="more">展开一味 <i aria-hidden="true">↗</i></span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="back-now floating-now" onClick={() => goToNow()} aria-label="回到此刻" title="回到此刻">
          <span aria-hidden="true">◎</span>
        </button>
      </section>

      <aside className="data-note">
        <span className="pulse" />
        上市时间依据苏州本地公开报道校准；未有当年报道的条目以常年节令暂代。
      </aside>

      {selected && (
        <div className="detail-layer" role="presentation">
          <button className="detail-backdrop" onClick={() => setSelected(null)} aria-label="关闭食物详情" />
          <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <button className="detail-close" onClick={() => setSelected(null)} aria-label="关闭">×</button>
            <div className="detail-art" style={artStyle(selected)} aria-hidden="true" />
            <div className="detail-content">
              <div className="detail-kicker">
                <span>苏州时令</span>
                <i>{selected.window}</i>
              </div>
              <h2 id="detail-title">{selected.name}</h2>
              <p className="detail-note">{selected.note}</p>

              <dl>
                <div><dt>上市时间</dt><dd>{selected.window}</dd></div>
                <div><dt>苏州哪里</dt><dd>{selected.place}</dd></div>
                <div><dt>如何挑选</dt><dd>{selected.choose}</dd></div>
              </dl>

              <div className="source-card">
                <span>时间依据</span>
                <strong>{selected.source}</strong>
                <small>{selected.sourceDate}</small>
                {selected.sourceUrl && (
                  <a href={selected.sourceUrl} target="_blank" rel="noreferrer">查看报道原文 ↗</a>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
