export interface CoverageMetric {
  total: number;
  covered: number;
  skipped: number;
  pct: number | string;
}

export interface CoverageData {
  lines: CoverageMetric;
  statements: CoverageMetric;
  functions: CoverageMetric;
  branches: CoverageMetric;
  branchesTrue?: CoverageMetric;
}

export interface CoverageSummary {
  total: CoverageData;
  [filePath: string]: CoverageData;
}
